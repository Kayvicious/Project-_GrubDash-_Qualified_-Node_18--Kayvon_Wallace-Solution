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

function dishExists (req, res, next) {
  const dishId = req.params.dishId;
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  }
  next({
    status: 404,
    message: req.params.dishId
  });
} 

function list(req, res) {
  res.json({ data: dishes });
}

function read (req, res) {
  dishes.push(res.locals.dish)
  res.json({data: res.locals.dish})
}

module.exports = {
  create: [hasText, create],
  list,
  read: [dishExists, read]
}