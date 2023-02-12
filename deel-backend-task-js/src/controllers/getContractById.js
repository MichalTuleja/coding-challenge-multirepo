const { sequelize, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

const typeToIdDict = {
    'client': 'ClientId',
    'contractor': 'ContractorId',
};

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

module.exports = getContractById;
