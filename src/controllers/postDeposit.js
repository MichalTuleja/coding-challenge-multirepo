const { sequelize, Job, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

const getProfile = (profileId, trx) => Profile.findOne({
    where: { id: profileId }
}, { transaction: trx });

const getBalance = async (profileId, trx) => (await getProfile(profileId, trx)).balance;

const decreaseBalance = (profileId, amount, trx) => Profile.decrement({ balance: -amount }, { where: { id: profileId } }, { transaction: trx });
const increaseBalance = (profileId, amount, trx) => Profile.increment({ balance: amount }, { where: { id: profileId } }, { transaction: trx });

const postDeposit = async (req, res) => {
    const { userId } = req.params;

    const { id: profile_id, type } = req.profile.dataValues;

    if (type !== 'client') {
        return res
            .status(httpStatus.NOT_FOUND)
            .send('Only clients can pay for jobs!')
            .end();
    }

    const trx = await sequelize.transaction();

    try {
        const { Job, Contract, Profile } = req.app.get('models');

        const result = await Profile.findAll({
            attributes: [
                'id',
                [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
            ],
            where: {
                type: 'client',
                id: userId,
            },
            include: [
                {
                    model: Contract,
                    required: true,
                    as: 'Client',
                    include: [
                        {
                            model: Job,
                            required: true,
                            where: {
                                paid: { [Op.not]: true },
                            },
                        }
                    ]
                },
            ],
        }, { transaction: trx });

        const jobs = [];
        result[0]['Client'].forEach(e => {
            e.Jobs.forEach(m => {
                jobs.push({ contractorId: e.ContractorId, clientId: e.ClientId, ...m.dataValues });
            })
        });

        await Promise.all(jobs.map(job => {
            return decreaseBalance(job.contractorId, job.price * 0.25, trx);
        }));

        await Promise.all(jobs.map(job => {
            return increaseBalance(job.clientId, job.price * 0.25, trx);
        }));

        await trx.commit();

        return res.json(jobs);
    } catch (error) {
        await trx.rollback();
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send('Internal server error.')
            .end();
    }
};

module.exports = postDeposit;
