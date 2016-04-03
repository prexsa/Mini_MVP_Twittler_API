
var Twitter = require('twitter');
var http = require('http');
var parser = require('body-parser');

var fs = require('fs');

var express = require('express');
var app = express();


console.log(parser.json());

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));


var client = new Twitter({
	consumer_key: '6kmE1MYuGtRSrBwEadujAMJkj',
	consumer_secret: '7qMYQPXXVxX92h2StZFHHOZNb579jKjeosXmsIldorXMoeQpwJ',
	access_token_key: '206399632-FVwmu6aRvYymgG3L5nQZKKPLxqCmCtpVGjJtxlRC',
	access_token_secret: '0ovlC1W5gXNMX0lw5MN1dFAoZNgZZMs3zYiFGPQy6Z4jS'
});


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


var server = http.createServer(app);


app.post('/twitterler', function(req, res){
	var params = {q: req.body.userName, count: 25};
			client.get('search/tweets', params, function(error, tweets, response){
			  if (!error) {
			    res.send(tweets);
			  }
			});
});



app.use(express.static('./client'));

var port = 3000;
server.listen(port);
console.log("Listening on port " + port);
