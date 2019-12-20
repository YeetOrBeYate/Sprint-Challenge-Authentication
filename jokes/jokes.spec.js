const request = require('supertest');
const server = require("../api/server.js");

describe("/get jokes",function(){

    it("should return a 401 status without headers",function(){
        return request(server)

        .get('/api/jokes')

        .then(res=>{
            expect(res.status).toBe(401);
        })
    })

    it("should return json", function(){
        return request(server)

        .get('/api/jokes')

        .then(res=>{
            expect(res.type).toMatch(/json/i)
        })
    })
})