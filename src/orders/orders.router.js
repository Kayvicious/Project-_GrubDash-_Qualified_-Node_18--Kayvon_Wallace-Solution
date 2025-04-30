const router = require("express").Router();
const controller = require("./orders.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed");
// TODO: Implement the /orders routes needed to make the tests pass

router
  .route("/:orderId")
  .get(controller.read)
  .put(controller.update)

router.route("/").post(controller.create);

module.exports = router;
