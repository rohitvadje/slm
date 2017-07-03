/*
 * Author : rohit.8859@gmail.com
 * Modules : Server
 */

/*
 * Variables
 */
var express = require('express');
var path = require('path');
var request=require('request');
var admin = require("firebase-admin");
var st = require('./modules/status');
var live = require('./modules/live_check');

var app = express();
var d = new Date();
var loop_time = 5000;

/*
 * Trigger watch
 */
live.turnOnWatch(false); //parameter : strict watch 

/*
 * Routing
 */
app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/getstatus',function(req,res){ 
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify(st.local));
});

app.listen(3002, function () {
	console.log('[Info] Server listening to URL --> http://localhost:3002/')
});

