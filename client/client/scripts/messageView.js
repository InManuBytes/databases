var MessageView = {
  render: _.template(`
      <div class="chat">
        <div class="username">
          <%= userName %>
        </div>
        <div class="text">
          <%= message_text %>
        </div>
      </div>
    `)
};