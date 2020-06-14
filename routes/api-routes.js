// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// const Sequelize = require("sequelize");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for grabbing data about a user's subjects
  app.get("/api/categories", (req, res) => {
    if (!req.user) {
      // If the user isn't logged in, nothing will show up
      res.json();
    } else {
      // Otherwise, send info about the subjects the user will see
      db.Category.findAll({}).then(dbCat => {
        res.json(dbCat);
      });
    }
  });

  // Route for grabbing data about one subject using ID
  app.get("/api/category/:id", (req, res) => {
    db.Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbCat => {
      res.json(dbCat);
    });
  });

  // Route for finding a random subject
  app.get("/api/category", (req, res) => {
    db.Category.findOne({
      order: "rand()"
    }).then(dbCat => {
      res.json(dbCat);
    });
  });

  // Create a subject
  app.post("/api/category/add", (req, res) => {
    db.Category.create({
      name: req.body.name
    }).then(dbCat => {
      res.json(dbCat);
    });
  });

  // Delete a subject
  app.delete("/api/category/:id", (req, res) => {
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbCat => {
      res.json(dbCat);
    });
  });
};
