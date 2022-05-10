const {expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);




// Test all functionalities for the post endpoint for login
describe('POST /login', () => {
    it('should return a status code of 200', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                username: 'admin',
                password: '1234'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            }
            );
    }
    );
    it('should return a status code of 404', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                username: 'admin',
                password: 'wrongPassword'
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            }
            );
    }
    );
    it('should display an error if input is blank', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                username: '',
                password: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            }
            );
    }
    );
    it('should display an error if username is incorrect and password is correct', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                username: 'wrongUsername',
                password: '1234'
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            }
            );
    }
    );
    // Test if user_id is added to localstorage
    it('should add user_id to localstorage', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                username: 'admin',
                password: '1234'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(localStorage.getItem('user_id')).to.equal('1');
                done();
            }
            );
    }
    );
});