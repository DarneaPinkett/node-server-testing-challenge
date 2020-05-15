const express = require("express");
const cors = require("cors");
const dogsRouter = require("./dogs/dogs-router");

const server = express()
const port = process.env.PORT || 3000

server.use(cors())
server.use(express.json())

server.use("/dogs", dogsRouter)
server.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Pound",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`)
    })
}

module.exports = server