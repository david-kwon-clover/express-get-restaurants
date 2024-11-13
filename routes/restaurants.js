const express = require("express");
const { Restaurant, Menu, Item } = require("../models/index")
const db = require("../db/connection");
const { check, validationResult } = require("express-validator");

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", async (req, res, next) => {
    try {
        const restaurants = await Restaurant.findAll({ 
            include: Menu,
            include: [{
                model: Menu,
                include: [{
                    model: Item
                }]
            }] 
        });
        if(!restaurants) {
            throw new Error("No restaurants found.");
        }
        res.json(restaurants);
    } catch(error) {
        next(error);
    }
})

restaurantsRouter.get("/:id", async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if(!restaurant) {
            throw new Error("No restaurant found.");
        }
        res.json(restaurant);
    } catch(error) {
        next(error);
    }
})

restaurantsRouter.post("/", [
    check("name").trim().notEmpty().withMessage("name cannot be empty"),
    check("location").trim().notEmpty().withMessage("location cannot be empty"),
    check("cuisine").trim().notEmpty().withMessage("cuisine cannot be empty"),
], 
async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.array()});
    }
    await Restaurant.create(req.body);
    res.json(await Restaurant.findAll());
})

restaurantsRouter.put("/:id", async (req, res, next) => {
    try {
        await Restaurant.update(req.body, { where: { id: req.params.id } });
        res.status(201);
        res.json({
            "Updated": req.body
        })
    } catch(error) {
        next(error);
    }
})

restaurantsRouter.delete("/:id", async (req, res, next) => {
    try {
        await Restaurant.destroy({ where: { id: req.params.id } });
        res.status(200);
        res.send(`Successfully deleted entry with id:${req.params.id}`);
    } catch(error) {
        next(error);
    }
})


module.exports = restaurantsRouter;