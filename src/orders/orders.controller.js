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
    deliverTo,
    mobileNumber,
    status,
    dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder})
}

function hasText(requireStatus = false) {
  return function (req, res, next) {
    const { data: { deliverTo, mobileNumber, dishes } = {} } = req.body;

    if (!deliverTo) return next({ status: 400, message: "deliverTo is required" });
    if (!mobileNumber) return next({ status: 400, message: "mobileNumber is required" });
    if (!Array.isArray(dishes) || dishes.length === 0) {
      return next({ status: 400, message: "At least one dish is required" });
    }

    for (const [index, dish] of dishes.entries()) {
      if (dish.quantity === undefined) {
        return next({ status: 400, message: `Dish ${index} must have a quantity` });
      }
      if (!Number.isInteger(dish.quantity) || dish.quantity <= 0) {
        return next({
          status: 400,
          message: `Dish ${index} must have a quantity that is an integer greater than 0`,
        });
      }
    }
    
    // THEN: check other fields like status
    if (requireStatus) {
      const { status } = req.body.data;
      const validStatuses = ["pending", "preparing", "out-for-delivery", "delivered"];
      if (!status || !validStatuses.includes(status)) {
        return next({ status: 400, message: "Order must have a valid status" });
      }
      if (status === "delivered") {
        return next({ status: 400, message: "A delivered order cannot be changed" });
      }
    }

    next();
  };
}

function orderExist (req, res, next) {
  const orderId = req.params.orderId;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({
    status: 404,
    message: req.params.orderId
  });
}

function read(req, res) {
  res.json({ data: res.locals.order });
}

function read(req, res) {
  res.json({ data: res.locals.order });
}

function update(req, res, next) {
  const { orderId } = req.params;
  const { data: {id, deliverTo, mobileNumber, status, dishes } = {}} = req.body;
  
  
  if (id && id !== orderId ) {
    return next({
      status: 400, 
      message: `Order id does not match route id. Order: ${id}, Route: ${orderId}.`
    });
  }
  
  if (res.locals.order && deliverTo && mobileNumber && status && dishes) {
    res.locals.order.deliverTo = deliverTo;
    res.locals.order.mobileNumber = mobileNumber;
    res.locals.order.status = status;
    res.locals.order.dishes = dishes;
    res.json({ data: res.locals.order });
  }
  
  res.json({ data: res.locals.order})
}

module.exports = {
  create: [hasText(false), create],
  read: [orderExist, read],
  update: [orderExist, hasText(true), update],    
}
