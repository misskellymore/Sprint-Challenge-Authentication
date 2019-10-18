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


            it('should return a status of 400 if missing username and or pwd', () => {

                let response;

                const invalid = {username: 'username'}


                return request(server)
                .post('/api/auth/register')
                .send(invalid)
                .then(res => {
                    response = res;

                    expect(response.status).toBe(400);
                })
            });


            it('should return a status of 201 if username and pwd are provided', () => {

                let response;
                const valid = { username: 'username', password: 'password' }

                return request(server)
                .post('/api/auth/register')
                .send(valid)
                .then(res => {
                    response = res;
                    expect(response.status).toBe(201);
                })

            })


            it('should send 401 error if username and or pwd are invalid', () => {
                const newUser = { username: 'jelly12', password: '321' };
                model.insert(newUser)

                let response;

                return request(server)
                .post('/api/auth/login')
                .send({ username: 'jelly12', password: '321' })
                .then(res => {
                    response = res;
                    expect(response.status).toBe(401);
                })
            })


        });

        describe('/api/auth/login', () => {
            it('should return JSON obj', () => {
                let response;

                return request(server).post('/api/auth/login')
                .then(res => {
                    response = res;

                    expect(response.type).toEqual('application/json');
                })
            })
        })







    })
})