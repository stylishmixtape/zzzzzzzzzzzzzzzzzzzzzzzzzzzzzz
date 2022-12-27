$(document).ready(function() {
  // Connect to the server using Socket.io
  var socket = io();

  let initials = document.getElementById('initials').value || 'anon';
  // Get the messages list element
  var messagesList = document.getElementById('history');

  // When the 'message' event is received, add the message to the chat history
  // and scroll the chat history down to the bottom
  socket.on('message', function(msg) {
    $('#history').append($('<li>').text(msg));
    messagesList.scrollTop = messagesList.scrollHeight;
  });

  $('form').submit(function(e) {
    e.preventDefault();
    let message = $('#message').val();
    if (message.trim().length === 0) {
      return false;
    }
    socket.emit('message', `${initials}: ${message}`);
    $('#message').val('');
    return false;
  });


  $('#confirm').click(() => {
    initials = $('#initials').val();
    $('#initials-display').text(`Username: ${initials}`);
  });
})
