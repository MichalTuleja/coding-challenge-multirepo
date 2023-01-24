const { sequelize, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

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
module.exports = getUnpaidJobs;
