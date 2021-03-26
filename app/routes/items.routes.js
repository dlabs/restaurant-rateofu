module.exports = app => {
  const items = require("../controllers/items/items.controller.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/", items.create);

  // Retrieve all Items
  router.get("/", items.findAll);

  // Retrieve a single Order with id
  router.get("/:id", items.findOne);

  // Update a Order with id
  router.put("/:id", items.update);

  app.use('/api/items', router);
};