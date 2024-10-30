const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function create (req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newDish = { 
    id: nextId(),
    name: name,
    description: description ,
    price: price,
    image_url: image_url,
  };
  console.log(newDish)
  dishes.push(newDish);
  res.status(201).json({ data: newDish})
}

function hasText(req, res, next) {
const { data: { name, description, price, image_url } = {} } = req.body;

if ( name && description && price > 0 && image_url) {
  return next();
}
next({ status: 400, message: "All property is required '(name, description, price, image_url)'." });
}

module.exports = {
  create: [hasText, create],
  
}