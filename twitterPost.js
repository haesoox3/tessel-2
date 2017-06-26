//require photo
//upload to twitter with text "Another food stealer caught on camera!"
//photo is piped in



const express = require('express');
const app = express();
const Twitter = require("twitter-node-client").Twitter;
const path = require('path');
const photoPath = "";

var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
  };
var success = function (data) {
  console.log('Data [%s]', data);

var config = {
  consumerKey:'pXj2lPHHpK7bRZsyauMyVQfjT',

}

var twitter = new Twitter(config)
twitter.postMedia(photoPath, error, success)
