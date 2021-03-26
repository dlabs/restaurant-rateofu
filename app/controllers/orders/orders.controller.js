const db = require("../../models");
const Orders = db.orders;
const Op = db.Sequelize;

// Create and Save a new Orders
exports.create = (req, res) => {
  // Validate request
  if (!req.body.order) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Orders
  const orders = {
    order: req.body.order,
    status: req.body.status,
    batchTypeOrder: req.body.batchTypeOrder
  };

  // Save Orders in the database
  Orders.create(orders)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Orders."
      });
    });
};

// Retrieve all Orderss from the database.
exports.findAll = (req, res) => {

  Orders.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

// Find a single Orders with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Orders.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Orders with id=" + id
      });
    });
};

// Update a Orders by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Orders.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Orders was updated"
        });
      } else {
        res.send({
          message: `Cannot update Orders with id=${id}.!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Orders with id=" + id
      });
    });
};

