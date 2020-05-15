const express = require("express");
const Dogs = require("./dogs-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.json(await Dogs.find())
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const dog = await Dogs.findById(req.params.id)
        if(!dog) {
            return res.status(404).json({
                message: "Dog is lost"
            })
        }
        res.json(dog) 
    } catch(err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const dog = await Dogs.create(req.body)
        res.status(201).json(dog)
    } catch (err) {
        next(err)
    }
})

module.exports = router