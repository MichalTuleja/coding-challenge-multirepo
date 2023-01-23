const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

const should = chai.should();

const seedDatabase = require('../scripts/seedDb');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Contracts', () => {
    beforeEach((done) => {
        // This will drop and seed the DB
        seedDatabase().then(done);
        // done();
    });

    describe('/GET contracts by ID', () => {
        it('it should GET the contract by ID when user ID matches', done => {
            chai.request(server)
                .get('/contracts/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('id').equal(1);
                    done();
                });
        });

        it('it should not GET the contract by ID when user does not match', done => {
            chai.request(server)
                .get('/contracts/6')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.empty;
                    done();
                });
        });
    });

    describe('/GET contracts with pagination', () => {
        it('it should GET the contract for that user', done => {
            chai.request(server)
                .get('/contracts')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.rows).to.be.an('array');
                    expect(res.body.rows).to.have.a.lengthOf(1);
                    expect(res.body.rows[0].id).to.equal(1);
                    done();
                });
        });
    });
});
