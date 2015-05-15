var express = require('express');
var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var io = require('socket.io').listen(3000);
var Twit = require('twit')
var config = require('./config')

var T = new Twit(config.twitter)

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

//
//  filter the twitter public stream by the word 'mango'.
//
var stream = T.stream('statuses/filter', { track: 'mango' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
  io.emit('tweet', tweet);
})
