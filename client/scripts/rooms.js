var Rooms = {

  _data: new Set,

  selected: 'lobby',

  items: function() {
    return _.chain([...Rooms._data]);
  },

  add: function(room, callback = ()=>{}) {
    Rooms._data.add(room);
    Rooms.selected = room;
    callback(Rooms.items());
  },

  isSelected: function(roomname) {
    return true;
    return roomname === Rooms.selected || !roomname && Rooms.selected === 'lobby';
  },

  update: function(messages, callback) {
    var length = Rooms._data.size;

    _.chain(messages)
      .pluck('roomname')
      .uniq()
      .each(room => Rooms._data.add(room));
    // var rooms = _.pluck(messages, 'roomname');
    // // rooms = rooms.uniq();
    // _.each(rooms, room => Rooms._data.add(room));

    if (Rooms.selected === null) {
      Rooms.selected = Rooms._data.values().next().value;
    }
    if (Rooms._data.size !== length) {
      callback(Rooms.items());
    }
  }

};