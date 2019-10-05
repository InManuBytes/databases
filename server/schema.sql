-- can have an automatic drop here instead of doing in the terminal
-- DROP DATABASE chat;
-- use command: drop to delete database
CREATE DATABASE chat;

USE chat;

-- Create table syntax
-- CREATE TABLE table_name
-- (col_name col_definition,
-- ...more columns...
-- PRIMARY KEY (col_name),
-- FOREIGN KEY SYNTAX)
-- WHERE FOREIGN KEY SYNTAX:
-- FOREIGN KEY (col_name,...) REFERENCES tbl_name (col_name,...)

-- EX:
-- insert into rooms (room_name) value ('lobby'); -> will autoincrement ids

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  room_name CHAR(25),
  primary key (id)
) ENGINE = InnoDB;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  userName CHAR(20),
  primary key (id)
) ENGINE = InnoDB;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  message_text VARCHAR(100),
  userName INT,
  -- the user is linked to the users table
  room INT,
  foreign key (userName)
    references users(id)
    ON DELETE CASCADE,
  foreign key (room)
    references rooms(id)
    ON DELETE CASCADE,
  primary key (id)
) ENGINE = InnoDB;

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
