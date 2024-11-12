const express = require("express");
const Restaurant = require("../models/index")
const db = require("../db/connection");

const restaurantsRouter = express.Router();

restaurantsRouter.get("/restaurants", async (req, res, next) => {
    try {
        const restaurants = await Restaurant.findAll();
        if(!restaurants) {
            throw new Error("No restaurants found.");
        }
        res.json(restaurants);
    } catch(error) {
        next(error);
    }
})

restaurantsRouter.get("/restaurants/:id", async (req, res, next) => {
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

restaurantsRouter.post("/restaurants", async (req, res, next) => {
    try {
        await Restaurant.create(req.body);
        res.status(201);
        res.json({
            "Created": req.body
        })
    } catch(error) {
        next(error);
    }
})

restaurantsRouter.put("/restaurants/:id", async (req, res, next) => {
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

restaurantsRouter.delete("/restaurants/:id", async (req, res, next) => {
    try {
        await Restaurant.destroy({ where: { id: req.params.id } });
        res.status(200);
        res.send(`Successfully deleted entry with id:${req.params.id}`);
    } catch(error) {
        next(error);
    }
})


module.exports = restaurantsRouter;