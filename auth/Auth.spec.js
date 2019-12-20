const request = require('supertest');
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const model = require("../auth/Auth-Model.js");

describe("post requests", function(){

    beforeEach( async ()=>{
        await db('users').truncate();
     })

     describe('post /api/auth/register',  function(){

        it('responds with 200 status on register', function(done) {
            request(server)
              .post('/api/auth/register')
              .send({username: 'john', password: 'john'})
              .set('Accept', 'application/json')
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
        });

        it('responds with json', function(done) {
            request(server)
              .post('/api/auth/register')
              .send({username: 'john', password: 'john'})
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
        });

        it('proves insert function works', async function(){

            await model.insert({username: "kyle", password:"kyle"})

            const users = await db('users');
            expect(users).toHaveLength(1);
        })

    })

    describe('post /api/auth/login',  function(){

        it('responds with 500 status on register', function(done) {
            request(server)
              .post('/api/auth/login')
              .send({username: 'john', password: 'john'})
              .set('Accept', 'application/json')
              .expect(500)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
        });

        it('responds with json', function(done) {
            request(server)
              .post('/api/auth/login')
              .send({username: 'john', password: 'john'})
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .end(function(err, res) {
                if (err) return done(err);
                done();
              });
        });

    })
})