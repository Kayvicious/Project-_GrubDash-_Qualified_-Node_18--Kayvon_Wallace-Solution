const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

function create (req, res) {
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
    const newOrder = { 
      id: nextId(),
      deliverTo : deliverTo,
      mobileNumber: mobileNumber ,
      status: status,
      dishes: res.locals.dish,
    };
    console.log(newOrder)
    orders.push(newOrder);
    res.status(201).json({ data: newOrder})
  }

  module.exports = {
    create: [create]
    
  }
