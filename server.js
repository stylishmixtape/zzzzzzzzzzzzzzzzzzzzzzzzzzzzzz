console.log('Opening server');

const express = require('express');
const app = express();

const http = require('https');
const server = http.Server(app);

app.use(express.static('client'));

const io = require('socket.io')(server);

const saved = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the sendMessage function
const sendMessage = (message) => {
  io.emit('message', message);
}

// Listen for input from the command line
rl.on('line', (input) => {
  io.emit('message', 'Administrator Message: ' + input);
});

// Listen for connection and message events
io.on('connection', (socket) => {
  // Send the chat history to the new user
  for(let i = 0; i < saved.length; i++) {
    socket.emit('message', saved[i]);
  }

  socket.on('message', (msg) => {
    // Add the new message to the chat history
    saved.push(msg);
    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });
});

// Add error handling
server.on('error', (error) => {
  console.error(error);
});

// Start the server
server.listen(1738, () => {
  console.log('Chat server running on port 1738...');
});
