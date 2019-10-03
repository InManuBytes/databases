// This will use the templated messages from the messageView file

var MessagesView = {

  $chats: $('#chats'),


  initialize: function() {
    MessagesView.$chats.on('click', MessagesView.handleClick);
    // MessageView.initialize();
  },

  render: function() {
    MessagesView.$chats.html('');

    Messages
      .items()
      .filter(message => Rooms.isSelected(message.roomname))
      .forEach((message) => {
        return MessagesView.renderMessage(message);
      // MessagesView.$chats.prepend($message);
      });
  },

  renderMessage: function(message) {
    MessagesView.$chats.prepend(MessageView.render(message));
  },

  handleClick: function(event) {
    // debugger;
    console.log(event.target);
    console.log('found the username', event.target.innerText);
    console.log('found the data', event.target.dataset.username);
    // The line below is the vanilla Javascript way of getting the username
    var username = event.target.dataset.username;
    // const { username } = event.target.dataset;
    // const { target } = event;
    // var target = event.target;
    // The three lines below is the jQuery way of getting the username
    // let user = $(target).data('username');
    // console.log('found the new user: ', user);
    // var username = $(event.target).data('username');
    if (username === undefined) { return; }

    Friends.toggleStatus(username, MessagesView.render);
  }



};


// prepend -> putting a node before the element in the DOM tree
// append -> putting a node after the element in the DOM tree