const { sequelize, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

const getBestProfessions = async (req, res) => {
    let { start, end } = req.query;

    // TODO: Add validator and BAD_REQUEST response
    const startDate = new Date(start || '2020-01-01');
    const endDate = new Date(end || Date.now());

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
                        where: {
                            paid: true,
                            paymentDate: {
                                [Op.between]: [startDate, endDate],
                            },
                        },
                        attributes: [],
                    }
                ]
            },
        ],
        order: [['earnings', 'DESC']],
    });

    return res.json(result);
};

module.exports = getBestProfessions;
