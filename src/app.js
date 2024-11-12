const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res, next) => {
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

app.get("/restaurants/:id", async (req, res, next) => {
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



module.exports = app;