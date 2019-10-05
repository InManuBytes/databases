var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('Serving GET request');
      models.messages.get((err, results) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          res.send(results);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, (err, results) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          res.send(results); //figure what what to send back since the database just says "OK"
        }
      });
      // body -> json object username, room, message_text req.body
      // want to have access to req.body in model.post
    } // a function which handles posting a message to the database
  },

  // usernames can't be more than 20 characters long
  // roomnames can't be more than 25 characters long
  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, results) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          // check results in the right format JSON
          res.send(results);
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
          res.send(results); //send back the username
        }
      });
    }
  }
};