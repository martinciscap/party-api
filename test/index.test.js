const request = require('supertest');
const app = require('../index.js');

describe('Register a new user', function() {
    it('POST a new user', (done) => {
        request(app)
            .post('/users/register')
            .send({
                "name": "Martin",
                "email": "martin.cisneros@gmail.com",
                "username": "twinkytwinkylittlestar1920120",
                "password": "holamundo"
            })
            .expect(200, done);        
    });
});

describe('Authenticate User', function() {
    it('Authenticate', (done) => {
        request(app)
            .post('/users/authenticate')
            .send({                
                "username": "twinkytwinkylittlestar1920120",
                "password": "holamundo"
            })
            .expect(200)
            .then(response => {
                const token = response.body.token;                                
                done();
                describe('Check user profile', function() {
                    it('Profile', (done2) => {                        
                        request(app)
                            .get('/users/profile')                            
                            .set({'Authorization': token, Accept: 'application/json' })
                            .expect(200, done2);                            
                    });
                });               
            });
    });
});