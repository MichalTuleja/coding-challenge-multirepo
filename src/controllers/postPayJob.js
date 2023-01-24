const { sequelize, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

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

module.exports = postPayJob;
