const supertest = require("supertest");
const server = require("../index");
const db = require("../data/dbconfig");

afterAll(async () => {
    await db.destroy()
})

describe("dogs test", () => {
    it("GET /Dogs", async () => {
        const res = await supertest(server).get("/Breeds")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(5)
        expect(res.body[0].name).toBe("Alaskan Malamute")
        expect(res.body[1].name).toBe("American Bulldog")
    })
})