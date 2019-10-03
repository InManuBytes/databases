var Messages = {
  _data: {},

  items: function() {
    return _.chain(Object.values(Messages._data)).sortBy('createdAt');
  },

  add: function(message, callback = () => {}) {
    Messages._data[message.objectId] = message;
    callback(Messages.items());
  },

  update: function(messages, callback = () => {}) {
    var length = Object.keys(Messages._data).length;
    for ( var message of messages) {
      Messages._data[message.objectId] = Messages._conform(message);
    }
    if (Object.keys(Messages._data).length !== length) {
      callback(Messages.items());
    }
  },

  _conform: function(message) {
    message.text = message.text || '';
    message.username = message.username || '';
    message.roomname = message.roomname || '';
    return message;
  }

};

