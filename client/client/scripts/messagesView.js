var MessagesView = {
  $chats: $('#chats'),

  initialize: function() {
    $('#chats').on('click', '.username', function(event) {
      Friends.toggleStatus();
    });
  },

  render: function(data, room) {
    for (var i = 0; i < data.results.length; i++) {
      if (
        data.results[i].hasOwnProperty('username') &&
        data.results[i].hasOwnProperty('text')
      ) {
        if (room && data.results[i].hasOwnProperty('roomname') && data.results[i].roomname === room) {
          MessagesView.renderMessage(data.results[i]);
        } else if (room === undefined || room === '') {
          MessagesView.renderMessage(data.results[i]);
        }
      }

    }
  },

  renderMessage: function(message) {
    var html = '';
    html += MessageView.render(message);
    $('#chats').append(html);
  }
};
