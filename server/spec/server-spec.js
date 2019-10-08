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
      database: 'chat_sequelize'
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

  xit('Should insert posted messages to the DB', function(done) {
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
    // insert first into room table
    // tables in sequelize called 'Rooms, Users, Messages'
    // tables in mysql called 'rooms, users, messages'
    dbConnection.query('INSERT INTO Rooms (room_name) VALUE ("main")', (err) => {
      if (err) { throw err; }
    });
    dbConnection.query('INSERT INTO Users (userName) VALUE ("hudson3836")', (err) => {
      if (err) { throw err; }
    });
    // then query -> insert into messages
    // if we're testing with sequelize use columns (message_text, userId, RoomId)
    // if testing with mysql schume use columnts (message_text, userName, room)
    var queryString = 'INSERT INTO Messages (message_text, userId, RoomId) VALUE ("Men like you can never change!", 1, 1)'; //insert here
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    console.log('query next');
    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) {
        console.log('query error');
        throw err; }
      // console.log('Didn\'t get an error');
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      // controllers -> get
      console.log('get request next');
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        if (error){
          console.log("ERROR:", error);
        }
        console.log('body: ',body);
        var messageLog = JSON.parse(body);
        console.log('messageLog:', messageLog);
        expect(messageLog.results[0].message_text).to.equal('Men like you can never change!');
        // using sequelize you have to use messageLog.results[0].Room.room_name
        // using mysql you have to use messageLog.results[0].room_name
        expect(messageLog.results[0].Room.room_name).to.equal('main');
        done();
      });
    });
  });

  xit('should only have one record for each user', function (done) {
    // make two post requests with the same username
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'Valjean' }
      }, function () {
        var queryString = 'SELECT id FROM users where userName = "Valjean"';
        var queryArgs = [];
        // results [{id: 1, userName: hudson3836},{}...]
        // results [xxx{id:6}]
        dbConnection.query(queryString, queryArgs, function (error, results) {
          expect(results.length).to.equal(1);
          done();
        });
      });
    });
  });
});
