var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

var User = db.define('User', {
  userName: Sequelize.STRING,
});

var Message = db.define('Message', {
  message_text: Sequelize.STRING,
  userName: Sequelize.INTEGER,
  room: Sequelize.INTEGER,
})

var Room = db.define('Rooms', {
  room_name: Sequelize.STRING,
})

// hasMany will store association key in target
User.hasMany(Message);
Room.hasMany(Message);
// you have to do also make the association the other way:
// https://sequelize.org/master/manual/associations.html
Message.belongsTo(Room);
Message.belongsTo(User);

// you have to do the sync here
Message.sync();
User.sync();
Room.sync();

module.exports.User = User;
module.exports.Message = Message;
module.exports.Room = Room;

// var mysql = require('mysql');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".

// var connection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

// //This line is included because I see the .connect() in the test file
// connection.connect();

// module.exports.connection = connection;