CREATE DATABASE chat;
-- use command: drop

USE chat;

-- Create table syntax
-- CREATE TABLE table_name
-- (col_name col_definition,
-- ...more columns...
-- PRIMARY KEY (col_name),
-- FOREIGN KEY SYNTAX)
-- WHERE FOREIGN KEY SYNTAX:
-- FOREIGN KEY (col_name,...) REFERENCES tbl_name (col_name,...)

-- insert into rooms value (1, 'lobby');
--                          id, room_name
CREATE TABLE rooms (
  id INT,
  room_name CHAR(25),
  primary key (id)
);

CREATE TABLE users (
  id INT,
  userName CHAR(20),
  primary key (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT,
  message_text VARCHAR(100),
  userName INT,
  -- the user is linked to the users table
  room INT,
  foreign key (userName) references users(id),
  foreign key (room) references rooms(id),
  primary key (id)
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
