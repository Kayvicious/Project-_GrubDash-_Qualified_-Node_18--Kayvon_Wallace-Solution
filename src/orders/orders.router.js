const router = require("express").Router();
const controller = require("./orders.controller.js");
// TODO: Implement the /orders routes needed to make the tests pass

router.route("/").post(controller.create);

module.exports = router;
