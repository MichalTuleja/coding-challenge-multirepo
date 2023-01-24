const { sequelize, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

const typeToIdDict = {
    'client': 'ClientId',
    'contractor': 'ContractorId',
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

module.exports = getContracts;
