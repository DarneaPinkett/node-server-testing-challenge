const supertest = require("supertest");
const server = require("../index");
const db = require("../data/dbconfig");

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("dogs test", () => {
    it("GET /dogs", async () => {
        const res = await supertest(server).get("/dogs")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(5)
        expect(res.body[0].name).toBe("Alaskan Malamute")
        expect(res.body[1].name).toBe("American Bulldog")
    })
    it("POST /dogs", async () => {
        const data = {name: "German Shepherd"}
        const res = await supertest(server).post("/dogs").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("German Shepherd")
    })
    it("PUT /:id", async () => {
        const data = {name: "English Bulldog"}
        const res = await supertest(server).put("/:id").send(data)
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("text/html")
    })
    it("DELETE /:id", async () => {
        const data = {name: "Bichon Frise"}
        const res = await supertest(server).delete("/:id").send(data)
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("text/html")
    })

})