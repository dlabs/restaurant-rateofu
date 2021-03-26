const db = require("../../models");
const Items = db.items;
const Op = db.Sequelize;

// Create and Save a new Items
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Items
  const items = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
  };

  // Save Items in the database
  Items.create(items)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Items."
      });
    });
};

// Retrieve all Itemss from the database.
exports.findAll = (req, res) => {
  
  Items.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving itemss."
      });
    });
};

// Find a single Items with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Items.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Items with id=" + id
      });
    });
};

// Update a Items by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Items.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Items was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Items with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Items with id=" + id
      });
    });
};
