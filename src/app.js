const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');
const httpStatus = require('http-status');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
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
});

module.exports = app;
