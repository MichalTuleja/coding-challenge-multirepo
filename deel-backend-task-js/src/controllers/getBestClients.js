const { sequelize, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

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

module.exports = getBestClients;
