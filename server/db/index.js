var Sequelize = require('sequelize');
var db = new Sequelize('chat_sequelize', 'root', '');

var User = db.define('User', {
  userName: Sequelize.STRING
}, {timestamps: false});
// syntax for models .define('title', {unique columns}, {options})
var Message = db.define('Message', {
  message_text: Sequelize.STRING
}, {timestamps: false});

var Room = db.define('Room', {
  room_name: Sequelize.STRING
}, {timestamps: false});

// hasMany will store association key in target
User.hasMany(Message);
Room.hasMany(Message);
// you have to do also make the association the other way:
// https://sequelize.org/master/manual/associations.html
Message.belongsTo(Room);
Message.belongsTo(User);

// you have to do the sync here
// will actually create the tables
Message.sync();
User.sync();
Room.sync();
// OUTPUT OF SYNC:
// Executing (default): CREATE TABLE IF NOT EXISTS `Messages` (`id` INTEGER NOT NULL auto_increment , `message_text` VARCHAR(255), `UserId` INTEGER, `RoomId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`RoomId`) REFERENCES `Rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
// Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `userName` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
// Executing (default): CREATE TABLE IF NOT EXISTS `Rooms` (`id` INTEGER NOT NULL auto_increment , `room_name` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
// Executing (default): SHOW INDEX FROM `Users`
// Executing (default): SHOW INDEX FROM `Rooms`
// Executing (default): SHOW INDEX FROM `Messages`

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