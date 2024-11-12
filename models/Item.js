const db = require("../db/connection.js");
const Sequelize = require("sequelize");

const Item = db.define("Item", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.INTEGER,
    vegetarian: Sequelize.BOOLEAN
})

module.exports = Item;