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

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
  console.log('SOMEONE CONNECTED:', socket.id);

  socket.on('send', function(data){
    console.log(data);
    io.sockets.emit('new', data);
  });
});


// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


    