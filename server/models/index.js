var db = require('../db/index.js');

module.exports = {
  messages: {
    get: function (arguments) {
      // here is where we do queries
      // id, message_text, id - userName (table), id - room (table)
        // want an entry to be -> id, message_text, username, room
        // ex: messages table
        // 1, 'hey', 1, 1
        // 2, 'what's up?', 2, 1

        //mysql> select * from messages;
// +----+----------------+----------+------+
// | id | message_text   | userName | room |
// +----+----------------+----------+------+
// |  1 | this is a test |        1 |    1 |
     // [{id: 1, message_text: this is a text, userName: "name", room: "room" }, {id: 2...}]
// +----+----------------+----------+------+
      db.connection.query('SELECT * FROM messages INNER JOIN rooms ON rooms.id = messages.room INNER JOIN userName ON users.id = messages.userName', function (err, results) {
        if (err) {
          throw err;
        }
      })
    }, // a function which produces all the messages
    post: function (message_text, user, room) {
      db.connection.query('SELECT ')
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

