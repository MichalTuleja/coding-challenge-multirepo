const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
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
 * Controllers
 */

/**
 * @returns contract by id
 */
const getContractById = async (req, res) => {
    const { Contract } = req.app.get('models');
    const { id } = req.params;
    const { id: profile_id, type } = req.profile.dataValues;

    let contract;

    console.log(profile_id);
    console.log(type);

    switch (type) {
        case 'client':
            contract = await Contract.findOne({ where: { id, 'ClientId': profile_id } });
            break;
        case 'contractor':
            contract = await Contract.findOne({ where: { id, 'ContractorId': profile_id } });
            break;
        default:
            return res.status(httpStatus.BAD_REQUEST).end();
    }

    if (!contract) return res.status(httpStatus.NOT_FOUND).end();
    res.json(contract);
};

const notImplemented = async (req, res) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).end();
};

/*
 * Routing
 */
app.get('/contracts/:id', getProfile, getContractById);
app.get('/contracts', getProfile, notImplemented);
app.get('/jobs/unpaid', getProfile, notImplemented);
app.post('/jobs/:job_id/pay', getProfile, notImplemented);
app.post('/balances/deposit/:userId', getProfile, notImplemented);
app.post('/admin/best-profession?start=<date>&end=<date>', getProfile, notImplemented);
app.get('/admin/best-clients?start=<date>&end=<date>&limit=<integer>', getProfile, notImplemented);

module.exports = app;
