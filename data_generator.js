/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.tweetTags = {};
window.users = Object.keys(streams.users);
window.currUser = undefined;
window.checkIndividual = false;

var displayTweets = function(isIndividual, user) { 
  checkIndividual = isIndividual ? true : false;
  var val = isIndividual ? streams.users[user] : streams.home;
  var $tweets = $('.tweets');
  $tweets.html('');
  var index = val.length - 1;
  while (index >= 0) {
    var tweet = val[index];
    var timeAgo = moment(tweet.created_at).fromNow();
    var userLine = '@' + tweet.user + ' · ' + timeAgo;
    var userName = tweet.user;
    var $tweeter = $('<div class="tweeter" onClick="userTweet(' + "'" + streams.home[index].user + "'" + ')"></div>');
    var $tweet = $('<div class="tweet"></div>');
    $tweeter.text(userLine);
    $tweet.text(tweet.message);
    $tweeter.appendTo($tweets);
    $tweet.appendTo($tweets);
    index -= 1;
  }
}

var userTweet = function(myUser) {
  checkIndividual = true;
  currUser = myUser;
  displayTweets(checkIndividual, currUser);
}

var trending = function() {
  var $trends = $('.trends');
  $trends.html('');

  var index = hashTags.length - 1;
  while (index >= 0) {
    var trendTag = hashTags[index];
    if (tweetTags[trendTag] === undefined) {
      var countText = '1000 Tweets';
    }
    else {
      var countText = tweetTags[trendTag] + '000 Tweets';
    }
    var $trend = $('<div class="trendContainer"></div>');
    var $count = $('<div class="trendCount"></div>')
    $trend.text(trendTag);
    $count.text(countText);
    $trend.appendTo($trends);
    $count.appendTo($trends);
    index -= 1;
  }
}

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var hashTags = tags.filter(tag => tag.length > 0);

var randomMessage = function(){
  var randTag = randomElement(tags);
  if (randTag.length > 0) {
    if (tweetTags[randTag] === undefined) {
      tweetTags[randTag] = 1;
    }
    else {
      tweetTags[randTag]++;
    }
  }
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randTag].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 10000);
  displayTweets(checkIndividual, currUser);
  trending();
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};