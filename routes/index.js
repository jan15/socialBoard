var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

router.get('/tweeter/:screen_name', function(req, res, next) {
  var params = { count: 200, include_rts: false, screen_name: req.params.screen_name };
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    var totals = { retweets: 0, favorites: 0 };
    if (!error) {
      tweets.forEach(function(tweet) {
        if (((new Date()) - (new Date(tweet.created_at)))/1000/60/60 <= 24) {
          totals.retweets += tweet.retweet_count;
          totals.favorites += tweet.favorite_count;
        }
      });
      res.json(totals);
    }
  });
});

module.exports = router;
