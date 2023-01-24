const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const httpStatus = require('http-status');

const should = chai.should();

const seedDatabase = require('../scripts/seedDb');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('API:', () => {
    beforeEach((done) => {
        // This will drop and seed the DB
        seedDatabase().then(done);
        // done();
    });

    describe('Contracts', () => {
        it('it should GET the contract by ID when user ID matches', done => {
            chai.request(server)
                .get('/contracts/1')
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('id').equal(1);
                    done();
                });
        });

        it('it should not GET the contract by ID when user does not match', done => {
            chai.request(server)
                .get('/contracts/6')
                .end((err, res) => {
                    res.should.have.status(httpStatus.NOT_FOUND);
                    res.body.should.be.empty;
                    done();
                });
        });

        it('it should GET contracts with pagination', done => {
            chai.request(server)
                .get('/contracts')
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows).to.have.a.lengthOf(1);
                    expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });
    });

    describe('Jobs', () => {
        xit('it should GET the contract for that user', done => {
            chai.request(server)
                .get('/jobs/unpaid')
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    // expect(res.body.rows).to.be.an('array');
                    // expect(res.body.rows).to.have.a.lengthOf(1);
                    // expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });

        xit('it should POST the job is paid', done => {
            const jobId = 1;
            chai.request(server)
                .post(`/jobs/${jobId}/pay`)
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    // expect(res.body.rows).to.be.an('array');
                    // expect(res.body.rows).to.have.a.lengthOf(1);
                    // expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });
    });

    describe('Balances', () => {
        xit('it should POST deposit into the balance of the client', done => {
            const userId = 2;
            chai.request(server)
                .get(`/balances/deposit/${userId}`)
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    // expect(res.body.rows).to.be.an('array');
                    // expect(res.body.rows).to.have.a.lengthOf(1);
                    // expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });

        xit('it should reject POST deposit into the balance of the client', done => {
            const userId = 2;
            chai.request(server)
                .post('/balances/deposit/${userId}')
                .end((err, res) => {
                    res.should.have.status(httpStatus.BAD_REQUEST);
                    // expect(res.body.rows).to.be.an('array');
                    // expect(res.body.rows).to.have.a.lengthOf(1);
                    // expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });
    });

    describe('Admin', () => {
        xit('it should GET the profession that earned the most money', done => {
            const startDate = '2021-01-23';
            const endDate = '2023-01-24';

            chai.request(server)
                .get(`/admin/best-profession?start=${startDate}&end=${endDate}`)
                .end((err, res) => {
                    res.should.have.status(httpStatus.OK);
                    // expect(res.body.rows).to.be.an('array');
                    // expect(res.body.rows).to.have.a.lengthOf(1);
                    // expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });

        xit('it should GET returns the clients the paid the most for jobs in the query time period', done => {
            const startDate = '2021-01-23';
            const endDate = '2023-01-24';
            const limit = 2;

            chai.request(server)
                .get(`/admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`)
                .end((err, res) => {
                    res.should.have.status(httpStatus.BAD_REQUEST);
                    // expect(res.body.rows).to.be.an('array');
                    // expect(res.body.rows).to.have.a.lengthOf(1);
                    // expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });
    });
});
