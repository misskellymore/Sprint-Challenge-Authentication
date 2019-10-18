const request = require('supertest');
const server = require('./server.js');

const db = require('../database/dbConfig.js');
const model = require('../models/userModel.js');




describe('server.js', () => {
    describe('auth route', () => {
        describe('/api/auth/register', () => {
            // beforeEach executes and clears out tbl b4 each test
            beforeEach(async () => {
                await db('users').truncate();
            });

            it('should return JSON obj', () => {
                let response;

                return request(server).post('/api/auth/register')
                .then(res => {
                    response = res;

                    expect(response.type).toEqual('application/json');
                })
            });


        })
    })
})