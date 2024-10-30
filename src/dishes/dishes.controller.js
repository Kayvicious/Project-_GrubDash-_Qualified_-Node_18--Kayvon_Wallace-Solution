const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function create (req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newDish = { 
    id: nextId,
    name: name,
    description: description ,
    price: price,
    image_url: image_url,
  };
  urls.push(newDish);
  res.status(201).json({ data: newDish})
}

module.exports = {
  create: [create],
  
}