module.exports = app => {
    const orders = require("../controllers/orders/orders.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Order
    router.post("/", orders.create);
  
    // Retrieve all Orders
    router.get("/", orders.findAll);
  
    // Retrieve a single Order with id
    router.get("/:id", orders.findOne);
  
    // Update a Order with id
    router.put("/:id", orders.update);

    app.use('/api/orders', router);
  };