const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const restaurantsRouter = require("../routes/restaurants.js");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below: 
app.use("/restaurants", restaurantsRouter);



module.exports = app;