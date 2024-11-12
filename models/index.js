const Restaurant = require('./Restaurant')
const Menu = require("./Menu");
const Item = require("./Item");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Item.belongsToMany(Menu, {through: "MenuItems"});
Menu.belongsToMany(Item, {through: "MenuItems"});

module.exports = { 
    Restaurant,
    Menu,
    Item
}