const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

/*
 * Import Controllers
 */
const getContractById = require('./controllers/getContractById');
const getContracts = require('./controllers/getContracts');
const getUnpaidJobs = require('./controllers/getUnpaidJobs');
const postPayJob = require('./controllers/postPayJob');
const getBestProfessions = require('./controllers/getBestProfessions');
const getBestClients = require('./controllers/getBestClients');
const postDeposit = require('./controllers/postDeposit');

const app = express();

/*
 * Middleware
 */
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/*
 * Routing
 */
app.get('/contracts/:id', getProfile, getContractById);
app.get('/contracts', getProfile, getContracts);
app.get('/jobs/unpaid', getProfile, getUnpaidJobs);
app.post('/jobs/:job_id/pay', getProfile, postPayJob);
app.post('/balances/deposit/:userId', getProfile, postDeposit);
app.get('/admin/best-profession', getBestProfessions);
app.get('/admin/best-clients', getBestClients);

module.exports = app;
