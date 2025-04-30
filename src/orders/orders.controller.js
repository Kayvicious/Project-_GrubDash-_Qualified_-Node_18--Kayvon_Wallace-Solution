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
      dishes: dishes,
    };
    console.log(newOrder)
    orders.push(newOrder);
    res.status(201).json({ data: newOrder})
  }

  function hasText(req, res, next) {
    const { data: { deliverTo, mobileNumber, dishes } = {} } = req.body;
  
    // Check if dishes array exists and contains at least one dish
    const hasDishes = Array.isArray(dishes) && dishes.length > 0;
    
      // Define the validation requirements with custom error messages
    const validations = [
      { valid: deliverTo, message: "deliverTo is required" },
      { valid: mobileNumber, message: "mobileNumber is required" },
      { valid: hasDishes, message: "At least one dish is required" },
    ];
  
    // Find the first validation error for the main fields
    const mainError = validations.find(({ valid }) => !valid);
    if (mainError) {
      return next({ status: 400, message: mainError.message });
    }
  
    for (const dish of dishes) {
      //if (!(dish.quantity > 0)) {
      //  return next({ status: 400, message: "quantity" });
      //}
      if (dish.quantity === "") {
        return next({ status: 400, message: "1" });
      }
      if (!Number.isInteger(dish.quantity)) {
        return next({ status: 400, message: "2" });
      }
      if (dish.quantity <= 0) {
        return next({ status: 400, message: `${dish.quantity}` });
      }
    }
    
  
    // If all validations pass, proceed to the next middleware
    next();
  }

  module.exports = {
    create: [hasText, create]
    
  }
