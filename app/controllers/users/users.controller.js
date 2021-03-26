const db = require("../../models");
const Users = db.users;
const Op = db.Sequelize;

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Users
  const users = {
    username: req.body.username,
    role: req.body.role,
  };

  // Save Users in the database
  Users.create(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });
};

// Retrieve all Userss from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Users.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userss."
      });
    });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Users with id=" + id
      });
    });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Users with id=" + id
      });
    });
};




