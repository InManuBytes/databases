// Start by trying to get a click handler going first. ex: a console.log() the message
// Then, get a way to get all the messages sent by specific friends

var Friends = {

  _data: new Set,

  items: function() {
    return _.chain([...Friends._data]);
  },

  isFriend: function(name) {
    return Friends._data.has(name);
  },

  toggleStatus: function(name, callback = ()=>{}) {
    if (Friends._data.has(name)) {
      Friends._data.delete(name);
      callback(false);
    } else {
      Friends._data.add(name);
      callback(true);
    }
  }
};