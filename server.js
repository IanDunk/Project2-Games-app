// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

// =============================================================
var PORT = process.env.PORT || 8080;

  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



// Static directory
app.use(express.static("public"));

// Home page route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Listener for incoming Socket connections 
io.on('connection', function(socket){
  // console.log ("connected");
  socket.on('send', function(msg){
    console.log('message received/sending: ' + msg);
    io.sockets.emit('new', msg);
  });
});
// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
//   http.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });


    