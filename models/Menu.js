const db = require("../db/connection.js");
const Sequelize = require("sequelize");

const Menu = db.define("Menu", {
    title: Sequelize.STRING
})

module.exports = Menu;