// const { default: test } = require('node:test');
const request = require('supertest');
// const { describe } = require('test');
const app = require("../mongoDbJSUsers");
jest.setTimeout(5000);


describe('1. GET /user/:username/:password', () =>{

    test("status:200, returns a user object with their app details", ()=>{
        return request(app)
        .get('/user/shudrea@gmail.com/iLoveCake')
        .expect(200)
        .then((response)=>{
            const user = response._body[0];
            expect(user).toBeInstanceOf(Object);
            expect(user.username).toBe("Sergiu");
        })
    })
  })

describe("Patching the journal entry", () =>{

    test("status 201, returns 201 confirming patch of new journal entry", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
        return request(app)
        .patch("/journal/Karl")
        .send(journalEntry)
        .expect(201)
    })

    test("status 400, journalEntry object is missing data", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            date: new Date()
        }
        return request(app)
        .patch("/journal/Karl")
        .send(journalEntry)
        .expect(400)
        .then((response)=>{
            expect(response._body.msg).toBe("Missing part of journal entry");
        })
    })

    test("status 400, user does not exist ", ()=>{
        const journalEntry = {
            challengeName: "Sl_1_NoPhoneBeforeBed",
            challengeEntryNumber:0,
            journalEntry:"Day 1, feeling good :)",
            date: new Date()
        }
        return request(app)
        .patch("/journal/Kar")
        .send(journalEntry)
        .expect(400)
        .then((response)=>{
            expect(response._body.msg).toBe("User does not exist");

        })
    })
})


describe('PATCH /challenges/:username', () => {
    test("status:200, responds with a patched challenge containing and array of dates, number of streak and number of times", () => {
        const challenge_updates = {"challenges.Sl_3_RegularSleep": {times: null, dates:["32323", "4234", "54"], streak: 100}}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_3_RegularSleep).toEqual(
                expect.objectContaining({
                    times: expect.any(Number),
                    dates:  expect.any(Array),
                    streak: expect.any(Number)
                })
            )
        })
    })

    test("status:200, responds with patched challenge streak", () => {
        const challenge_updates = {"challenges.Sl_3_RegularSleep.streak": 2}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_3_RegularSleep.streak).toBe(2)
        })
    })

    test.only("status:200, responds with patched challenge times to null", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB.times": null}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            console.log(response._body.challenges.Sl_6_NoAlcoholBB.times)
            expect(response._body.challenges.Sl_6_NoAlcoholBB.times).toBe(null)
        })
    })

    test("status:200, responds with patched challenge dates array", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB.dates": ["1234243234", "23424423"]}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(200)
        .then((response) => {
            expect(response._body.challenges.Sl_6_NoAlcoholBB.dates).toEqual(["1234243234", "23424423"])
        })
    })

    test("status:404, not found if username does not exist", () => {
        const challenge_updates = {"challenges.Sl_6_NoAlcoholBB": null}
        return request(app)
        .patch('/challenges/Sergiuasddasd')
        .send(challenge_updates)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })

    test("status:400, bad request when the key passed is invalid", () => {
        const challenge_updates = {"challenges.asbbbasdadsasdaasd": 3}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the dates value is not an array of strings", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.dates": [1,2, 3]}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the streak value is not a number", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.streak": "NotaNumber"}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })

    test("status:400, bad request when the times value is not a number", () => {
        const challenge_updates = {"challenges.2_DimLights3hBeforeBed.times": "NotaNumber"}
        return request(app)
        .patch('/challenges/Sergiu')
        .send(challenge_updates)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        })
    })
})
