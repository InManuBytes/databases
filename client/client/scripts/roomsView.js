var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    $('#rooms').on('click', 'button', function() {
      Rooms.add();
    });
    Rooms.currentRoom();
  },

  renderRoom: function(roomname) {
    // '#rooms select' will have the rooms as children
    var room = {'roomname': roomname};
    var html = '';
    var roomOption = _.template('<option value="<%= roomname %>"><%= roomname %></option>');
    html += roomOption(room);
    $('#rooms select').append(html);
  },

  render: function(data) {
    var html = '';
    var roomOption = _.template('<option value="<%= roomname %>"><%= roomname %></option>');
    for (var i = 0; i < data.results.length; i++) {
      if (data.results[i].hasOwnProperty('roomname')) {
        html += roomOption(data.results[i]);
      }
    }
    $('#rooms select').append(html).
      ready(function() {
        var found = {};
        $('option').each(function() {
          var $this = $(this);
          if (found[$this.attr('value')]) {
            $this.remove();
          } else {
            found[$this.attr('value')] = true;
          }
        });
      });
  },

  enterRoom: function(data) {
    $('#rooms select').change(function() {
      var selectedRoom = $(this).children('option:selected').val();
      var filteredData = {results: []};
      for (var i = 0; i < data.results.length; i++) {
        if (
          data.results[i].hasOwnProperty('roomname') &&
          data.results[i].roomname === selectedRoom
        ) {

        }

      }
    });
  }

};
