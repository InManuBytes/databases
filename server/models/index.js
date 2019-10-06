var db = require('../db/index.js');

module.exports = {
  messages: {
    get: function (callback) {
      // TO DO: only output the columns we need
      db.connection.query('SELECT * FROM messages INNER JOIN rooms ON rooms.id = messages.room INNER JOIN users ON users.id = messages.userName', function (err, results) {
        if (err) {
          callback(err, null);
        } else {
          // the client expects DATA => {results: [...results...]}
          callback(null, {results: results});
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
      // { username: 'anonymous', message: 'hey whats up' }
      // check for room, username exists in database?
      if (message.roomname === undefined) {
        message.roomname = '';
      }
      db.connection.query('select id FROM rooms where room_name = ?', [message.roomname], (err, results) => {
        if (err) {
          throw err;
        } else {
          console.log('looking for room in database:', results);
          if (results.length === 0) {
            console.log('creating a new room:', message.roomname);
            // if the room isn't in the database create it, if no room is specificed insert with empty string
            console.log('created a new room:', message.roomname);
            db.connection.query('INSERT INTO rooms (room_name) VALUE (?)', [message.roomname]);
          }
        }
      });
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
      db.connection.query('select id FROM users where userName = ?', [username], (err, results1) => {
        if (err) {
          callback(err, null);
        } else {
          console.log('looking for user in database:', results1);
          if (results1.length === 0) {
            // if the user isn't in the database create it, if no user is specificed -> that's weird
            db.connection.query('INSERT INTO users (userName) VALUE (?)', [username], function(err, results) {
              if (err) {
                callback(err, null);
              } else {
                console.log(results);
                callback(null, results);
              }
            });
          } else {
            callback(null, results1);
          }
        }
      });
    }
  }
};

