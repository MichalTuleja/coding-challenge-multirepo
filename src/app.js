const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Contract, Profile } = require('./model');
const { Op, ExclusionConstraintError } = require("sequelize");
const { getProfile } = require('./middleware/getProfile');
const httpStatus = require('http-status');
const app = express();

/*
 * Middleware
 */
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);


/*
 * Helpers
 */
const typeToIdDict = {
    'client': 'ClientId',
    'contractor': 'ContractorId',
};


/*
 * Controllers
 */

/**
 * @returns contract by id
 */
const getContractById = async (req, res) => {
    const { Contract } = req.app.get('models');
    const { id } = req.params;
    const { id: profile_id, type } = req.profile.dataValues;

    const contracts = await Contract.findOne({
        where: { id, [typeToIdDict[type]]: profile_id },
    });

    if (!contracts) return res.status(httpStatus.NOT_FOUND).end();
    res.json(contracts);
};

const getContracts = async (req, res) => {
    const PAGINATION_LIMIT = 2;

    const page = req.params.page || 0;

    const { Contract } = req.app.get('models');
    const { id: profile_id, type } = req.profile.dataValues;

    const contracts = await Contract.findAndCountAll({
        limit: PAGINATION_LIMIT,
        offset: PAGINATION_LIMIT * page,
        where: { [typeToIdDict[type]]: profile_id },
    });

    if (!contracts) return res.status(httpStatus.NOT_FOUND).end();
    res.json(contracts);
};

const getUnpaidJobs = async (req, res) => {
    const PAGINATION_LIMIT = 2;

    const page = req.params.page || 0;

    const { Job, Contract } = req.app.get('models');
    const { id: profile_id, type } = req.profile.dataValues;

    let jobs;

    jobs = await Job.findAndCountAll({
        limit: PAGINATION_LIMIT,
        offset: PAGINATION_LIMIT * page,
        where: { 
            'paid': { [Op.not]: true }
        },
        include: [
            { 
                model: Contract, 
                where: {
                    [typeToIdDict[type]]: profile_id,
                    [Op.or]: [
                        { 'status': 'in_progress' },
                        { 'status': 'new' },
                    ],
                },
                required: true,
            },
        ],
    });

    if (!jobs) return res.status(httpStatus.NOT_FOUND).end();
    res.json(jobs);
};

const postPayJob = async (req, res) => {
    const { job_id } = req.params;

    const { Job, Contract } = req.app.get('models');
    const { id: profile_id, type } = req.profile.dataValues;

    if (type !== 'client') {
        return res
            .status(httpStatus.NOT_FOUND)
            .send('Only clients can pay for jobs!')
            .end();
    }

    let job = await Job.findOne({
        where: {
            'id': job_id,
            'paid': { [Op.not]: true },
        },
        include: [
            { 
                model: Contract, 
                where: {
                    'ClientId': profile_id,
                },
                required: true,
            },
        ],
    });

    if (!job) {
        return res
            .status(httpStatus.NOT_FOUND)
            .send('The job is not found or already paid.')
            .end();
    }

    const getBalance = async (profileId) => (await Profile.findOne({ where: { id: profileId } })).balance;

    if ((await getBalance(profile_id)) < job.price) {
        return res.status(httpStatus.BAD_REQUEST).send('Insufficient balance!').end();
    }

    const result = await job.update({
        paid: true,
        paymentDate: new Date(),
    });
    // TODO: Update client and contractor balances
    // TODO: Add SQL transaction

    return res.json(result);
};

const getBestProfessions = async (req, res) => {
    let { start, end } = req.query;

    // TODO: Add validator and BAD_REQUEST response
    start = Date(start || Date('2020-01-01'));
    end = Date(end || Date('2024-01-01'));

    const { Job, Contract, Profile } = req.app.get('models');

    const result = await Profile.findAll({
        attributes: [
            'profession',
            [sequelize.fn('SUM', sequelize.col('price')), 'earnings']
        ],
        group: 'profession',
        include: [
            {
                model: Contract,
                required: true,
                as: 'Contractor',
                attributes: [],
                include: [
                    {
                        model: Job,
                        required: true,
                        where: { paid: true },
                        attributes: [],
                    }
                ]
            },
        ],
    });

    return res.json(result);
};

const getBestClients = async (req, res) => {
    const PAGINATION_LIMIT = 2;

    let { start, end, limit } = req.query;

    // TODO: Add validator and BAD_REQUEST response
    const startDate = new Date(start || '2020-01-01');
    const endDate = new Date(end || Date.now());

    const { Job, Contract, Profile } = req.app.get('models');

    const result = await Profile.findAll({
        attributes: [
            'id',
            [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
            [sequelize.fn('SUM', sequelize.col('price')), 'paid'],
        ],
        where: {
            type: 'client',
        },
        include: [
            {
                model: Contract,
                required: true,
                duplicating: false,
                as: 'Client',
                attributes: [],
                include: [
                    {
                        model: Job,
                        required: true,
                        duplicating: false,
                        where: {
                            paid: true,
                            paymentDate: {
                                [Op.between]: [startDate, endDate],
                            }

                        },
                        attributes: [],
                    }
                ]
            },
        ],
        group: 'Profile.id',
        order: [['paid', 'DESC']],
        limit: limit || PAGINATION_LIMIT,
    });

    return res.json(result);
};

const notImplemented = async (req, res) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).end();
};

/*
 * Routing
 */
app.get('/contracts/:id', getProfile, getContractById);
app.get('/contracts', getProfile, getContracts);
app.get('/jobs/unpaid', getProfile, getUnpaidJobs);
app.post('/jobs/:job_id/pay', getProfile, postPayJob);
app.post('/balances/deposit/:userId', getProfile, notImplemented);
app.get('/admin/best-profession', getBestProfessions);
app.get('/admin/best-clients', getBestClients);

module.exports = app;
