module.exports = app => {
  const users = require("../controllers/users/users.controller.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single Order with id
  router.get("/:id", users.findOne);

  // Update a Order with id
  router.put("/:id", users.update);

  app.use('/api/users', router);
};