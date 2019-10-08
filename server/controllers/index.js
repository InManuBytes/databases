var models = require('../models');
var db = require('../db/index.js');
var bluebird = require('bluebird');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('Serving GET request');
      // Since sequelize "replaces the model", you can just call the functions here
      db.Message.findAll({include: [{
                model: db.User,
                required: true,
                // we don't want a nested join because that would imply Rooms -> User relation
              }, { //we just list them here
                model: db.Room,
                required: true
              }]
            })
        .then((results) => {
            // before we passed this on in the model to reflect what the client expected
            res.json({results: results});
        })
        .catch((err) => {
          throw err;
        });
      // Before, the model handled the err, and allowed us access to results
      // models.messages.get((err, results) => {
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, (err, results) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          res.json(results); //figure what what to send back since the database just says "OK"
        }
      });
      // body -> json object username, room, message_text req.body
      // want to have access to req.body in model.post
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, results) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          // check results in the right format JSON
          res.json(results);
        }
      });
    },
    post: function (req, res) {
      console.log('trying to post a user');
      // json: { username: 'Valjean' }
      models.users.post(req.body.username, (err, results) => {
        if (err) {
          throw err;
        } else {
          res.json(results); //send back the username
        }
      });
    }
  }
};