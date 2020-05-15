const db = require("../data/dbconfig");

function find() {
    return db("dogs")
}

function findById(id) {
    return db("dogs")
    .where("id", id)
    .first()
}

async function create(data) {
    const [id] = await db("dogs").insert(data)
    return findById(id)
}

module.exports = {
    find,
    findById,
    create
}