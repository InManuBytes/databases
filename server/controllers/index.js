var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  // usernames can't be more than 20 characters long
  // roomnames can't be more than 25 characters long
  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

