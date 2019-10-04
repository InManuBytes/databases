var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: 'root',
  // Note sure if this should just be commented out or if something needs to be input here
  // password: "",
  database: 'chat'
});

//This line is included because I see the .connect() in the test file
connection.connect();

exports.connection = connection;