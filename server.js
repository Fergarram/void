var WSS = require('ws').Server;

// Start the server
var wss = new WSS({ port: 8081 });

// When a connection is established
wss.on('connection', function(socket) {

  // Send data back to the client
  socket.send("server_handshake");
  console.log('Sent handshake to client.');

  // When data is received
  socket.on('message', function(message) {
    console.log('Received: ' + message);
  });

  // The connection was closed
  socket.on('close', function() {
    console.log('Closed Connection ');
  });

});


function broadcastFileChange() {
  wss.clients.forEach(function each(client) {
    client.send('static_files_changed');
  });
}

//
// Watch File Event
//

const chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('static', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
  broadcastFileChange()
});



//
// Serve Static Server
//

const express = require('express')
const app = express()

app.use(express.static('static'))
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})