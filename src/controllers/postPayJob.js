const { sequelize, Job, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const httpStatus = require('http-status');

const getJobWithContract = (jobId, profileId, trx) => Job.findOne({
    where: {
        'id': jobId,
        'paid': { [Op.not]: true },
    },
    include: [
        { 
            model: Contract, 
            where: {
                'ClientId': profileId,
            },
            required: true,
        },
    ],
}, { transaction: trx });

const getProfile = (profileId, trx) => Profile.findOne({
    where: { id: profileId }
}, { transaction: trx });

const getBalance = async (profileId, trx) => (await getProfile(profileId, trx)).balance;

const decreaseBalance = (profileId, amount, trx) => Profile.decrement({ balance: -amount }, { where: { id: profileId } }, { transaction: trx });
const increaseBalance = (profileId, amount, trx) => Profile.increment({ balance: amount }, { where: { id: profileId } }, { transaction: trx });

const markAsPaid = (job, trx) => job.update({
    paid: true,
    paymentDate: new Date(),
}, { transaction: trx });

const postPayJob = async (req, res) => {
    const { job_id } = req.params;

    const { id: profile_id, type } = req.profile.dataValues;

    if (type !== 'client') {
        return res
            .status(httpStatus.NOT_FOUND)
            .send('Only clients can pay for jobs!')
            .end();
    }

    const trx = await sequelize.transaction();

    try {
        let job = await getJobWithContract(job_id, profile_id, trx);

        if (!job) {
            return res.status(httpStatus.NOT_FOUND)
                      .send('The job is not found or already paid.')
                      .end();
        }

        const contractorId = job.Contract.ContractorId;

        if ((await getBalance(profile_id)) < job.price) {
            return res.status(httpStatus.BAD_REQUEST).send('Insufficient balance!').end();
        }

        await decreaseBalance(contractorId, job.price, trx);
        await increaseBalance(profile_id, job.price, trx);

        const result = await markAsPaid(job, trx);

        await trx.commit();

        return res.json({ result });
    } catch (error) {
        await trx.rollback();
        console.log(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send('Internal server error.')
            .end();
    }
};

module.exports = postPayJob;
