var db = require('../db/index.js');

module.exports = {
  messages: {
    get: function (callback) {
      // TO DO: only output the columns we need
      db.connection.query('SELECT * FROM messages INNER JOIN rooms ON rooms.id = messages.room INNER JOIN users ON users.id = messages.userName', function (err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }, // a function which produces all the messages
    //-- insert into rooms value (1, 'lobby');
    post: function (message, callback) {
      console.log(message);
      // request with a body
      //    message: {
      //   username: 'Valjean',
      //   message: 'In mercy\'s name, three days is all I need.',
      //   roomname: 'Hello'
      // }
      // then query -> insert into messages

      db.connection.query('INSERT INTO messages (message_text, userName, room) VALUE (?, (SELECT id FROM users where userName = ?), (SELECT id FROM rooms where room_name = ?))', [message.message, message.username, message.roomname], function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.connection.query('SELECT * FROM users', function (err, results) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (username, callback) {
      // tables: users -> columns: id, userName
      // username gets passed in from the POST request
      // request({
      //   method: 'POST',
      //   uri: 'http://127.0.0.1:3000/classes/users',
      //   json: { username: 'Valjean' }
      // }
      console.log('made it to index.js line 60');
      db.connection.query('INSERT INTO users (userName) VALUE (?) ', [username], function(err, results) {
        if (err) {
          callback(err, null);
        } else {
          console.log(results);
          callback(null, results);
        }
      });
    }
  }
};

