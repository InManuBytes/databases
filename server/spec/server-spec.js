/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '', // getting an error here
      database: 'chat'
    });
    dbConnection.connect();

    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0');
    var tablenames = ['messages', 'rooms', 'users']; // TODO: fill this out

    tablenames.forEach(tablename => {
      dbConnection.query('truncate ' + tablename);
    });
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 1', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages'; // id, message_text, id - userName (table), id - room (table)
        // id, message_text, username, room
        // messages
        // 1, 'hey', 1, 1
        // 2, 'what's up?', 2, 1
        var queryArgs = []; //why are they empty?

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // console.log('queryArgs: ', queryArgs);
          console.log('results: ', results);
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message_text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = '';
    var queryArgs = [];
    // insert first into room table
    dbConnection.query('INSERT INTO rooms (room_name) VALUE ("main")', (err) => {
      if (err) { throw err; }
    });
    dbConnection.query('INSERT INTO users (userName) VALUE ("hudson3836")', (err) => {
      if (err) { throw err; }
    });
    // then query -> insert into messages
    var queryString = 'INSERT INTO messages (message_text, userName, room) VALUE ("Men like you can never change!", 1, 1)'; //insert here
    var message_text = 'Men like you can never change!';
    var room = '(SELECT id FROM rooms where room_name = "main")';
    //var queryArgs = [message_text, 1];
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }
      // console.log('Didn\'t get an error');
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      // controllers -> get
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        // console.log('body: ',body);
        var messageLog = JSON.parse(body);
        expect(messageLog[0].message_text).to.equal('Men like you can never change!');
        expect(messageLog[0].room_name).to.equal('main');
        done();
      });
    });
  });
});

