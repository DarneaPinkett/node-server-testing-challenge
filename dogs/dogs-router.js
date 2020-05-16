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

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Dogs.findById(id)
    .then(dog => {
        if(dog) {
            Dogs.update(changes, id)
            .then(updatedDog => {
                res.json(updatedDog);
            });
        } else {
            res.status(404).json({message: 'Cannot find dog'})
        }
    })
    .catch (err => {
        res.status(500).json({message: "Failed to updated dog"})
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Dogs.remove(id)
    .then(deleted => {
        if(deleted) {
            res.json({ removed: 'deleted'});
        } else {
            res.status(404)({message: "Could not find dog"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to delete dof'})
    })
})

module.exports = router