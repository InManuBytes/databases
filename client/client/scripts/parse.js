var Parse = {

  //server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,
  messageServer: `http://127.0.0.1:3000/classes/messages`,
  userServer: `http://127.0.0.1:3000/classes/users`,

  create: function(message, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      url: Parse.messageServer,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB || function (data) {
        conole.log('chatterbox: Message sent', data);
      },
      error: errorCB || function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  createUser: function(username, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      url: Parse.userServer,
      type: 'POST',
      data: JSON.stringify(username),
      contentType: 'application/json',
      success: successCB || function (data) {
        console.log('chatterbox: User added', data);
      },
      error: errorCB || function (data) {
        console.error('chatterbox: Failed to add user', data);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.messageServer,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};