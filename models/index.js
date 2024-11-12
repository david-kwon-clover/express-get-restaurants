const Restaurant = require('./Restaurant')
const Menu = require("./Menu");
const Item = require("./Item");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Item.belongsToMany(Menu);
Menu.belongsToMany(Item);

module.exports = { 
    Restaurant,
    Menu,
    Item
}