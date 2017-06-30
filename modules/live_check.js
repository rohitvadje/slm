/*
 * Author : rohit.8859@gmail.com
 * Module : Check status of target
 */

/*
 * Variables
 */
var request = require('../node_modules/request');
var target_url = require('./target_urls');
var status = require('./status');
var notification = require('./notifications');

let lastDevState        = '';
let lastDev1State       = '';
let lastStageState      = '';
let lastStage1State     = '';
let lastLtState         = '';
let lastProdState       = '';
let lastJenkinsState    = '';
let lastRallyState      = '';
let lastBitbucketState  = '';

var devStatusWatchAlive         = false;
var dev1StatusWatchAlive        = false;
var stageStatusWatchAlive       = false;
var stage1StatusWatchAlive      = false;
var ltStatusWatchAlive          = false;
var prodStatusWatchAlive        = false;
var jenkinsStatusWatchAlive     = false;
var rallyStatusWatchAlive       = false;
var bitbucketStatusWatchAlive   = false;

/*
 * Functions to keep watch on state
 */
function checkState(target,newState) {
	switch (target) {
	case 'Dev':
		if(newState!== lastDevState){
			if(newState == 'Connected'){
				status.local.data[0].status=1;
			}
			else{
				status.local.data[0].status=0;
			}
			notification.consoleNotify(target,newState)
		}
		lastDevState = newState
		break;
	case 'Dev1':
		if(newState!== lastDev1State){
			if(newState == 'Connected'){
				status.local.data[1].status=1;
			}
			else{
				status.local.data[1].status=0;
			}

			notification.consoleNotify(target,newState)
		}	
		lastDev1State = newState
		break;
	case 'Stage':
		if(newState!== lastStageState){
			if(newState == 'Connected'){
				status.local.data[2].status=1;
			}
			else{
				status.local.data[2].status=0;
			}
			notification.consoleNotify(target,newState)
		}	
		lastStageState = newState
		break;
	case 'Stage1':
		if(newState!== lastStage1State){
			if(newState == 'Connected'){
				status.local.data[3].status=1;
			}
			else{
				status.local.data[3].status=0;
			}
			notification.consoleNotify(target,newState)
		}	
		lastStage1State = newState
		break;
	case 'Lt':
		if(newState!== lastLtState){
			if(newState == 'Connected'){
				status.local.data[4].status=1;
			}
			else{
				status.local.data[4].status=0;
			}
			notification.consoleNotify(target,newState)
		}	
		lastLtState = newState; 
		break;
	case 'Prod':
		if(newState!== lastProdState){
			if(newState == 'Connected'){
				status.local.data[5].status=1;
			}
			else{
				status.local.data[5].status=0;
			}
			notification.consoleNotify(target,newState)
		}	
		lastProdState = newState
		break;	
	case 'Jenkins' : 
		if(newState!== lastJenkinsState){
			if(newState == 'Connected'){
				status.local.data[6].status=1;
			}
			else{
				status.local.data[6].status=0;
			}
			notification.consoleNotify(target,newState)
		}
		lastJenkinsState =  newState
		break;
	case 'Rally' :
		if(newState!== lastRallyState){
			if(newState == 'Connected'){
				status.local.data[7].status=1;
			}
			else{
				status.local.data[7].status=0;
			}
			notification.consoleNotify(target,newState)
		}			
		lastRallyState = newState
		break;
	case 'Bitbucket' : 
		if(newState!== lastBitbucketState){
			if(newState == 'Connected'){
				status.local.data[8].status=1;
			}
			else{
				status.local.data[8].status=0;
			}
			notification.consoleNotify(target,newState)
		}
		lastBitbucketState = newState
		break;
	default:
		notification.consoleNotify('Something went wrong while checking state')
		break;
	}
}

var devStatusWatch = function devStatus() {
	devStatusWatchAlive = true;
	request
	.get(target_url.dev_link)
	.on('response', function(response) {
		checkState('Dev','Connected');
	})
	.on('error', function(err) {
		checkState('Dev','Disconneted');
	})
}

var dev1StatusWatch = function dev1Status() {
	dev1StatusWatchAlive = true;
	request
	.get(target_url.dev1_link)
	.on('response', function(response) {
		checkState('Dev1','Connected');
	})
	.on('error', function(err) {
		checkState('Dev1','Disconneted');
	})
}

var stageStatusWatch = function stageStatus() {
	stageStatusWatchAlive = true;
	request
	.get(target_url.stage_link)
	.on('response', function(response) {
		checkState('Stage','Connected');
	})
	.on('error', function(err) {
		checkState('Stage','Disconneted');
	})
}

var stage1StatusWatch = function stage1Status() {
	stage1StatusWatchAlive = true;
	request
	.get(target_url.stage1_link)
	.on('response', function(response) {
		checkState('Stage1','Connected');
	})
	.on('error', function(err) {
		checkState('Stage1','Disconneted');
	})
}

var ltStatusWatch = function ltStatus() {
	ltStatusWatchAlive = true; 
	request
	.get(target_url.lt_link)
	.on('response', function(response) {
		checkState('Lt','Connected');
	})
	.on('error', function(err) {
		checkState('Lt','Disconneted');
	})
}

var prodStatusWatch = function prodStatus() {
	prodStatusWatchAlive = true;
	request
	.get(target_url.prod_link)
	.on('response', function(response) {
		checkState('Prod','Connected');
	})
	.on('error', function(err) {
		checkState('Prod','Disconneted');
	})
}

var jenkinsStatusWatch = function jenkinsStatus() {
	jenkinsStatusWatchAlive = true;
	request
	.get(target_url.jenkins_link)
	.on('response', function(response) {
		checkState('Jenkins','Connected');
	})
	.on('error', function(err) {
		checkState('Jenkins','Disconneted');
	})
}

var rallyStatusWatch = function rallyStatus() {
	rallyStatusWatchAlive = true;
	request
	.get(target_url.rally_link)
	.on('response', function(response) {
		checkState('Rally','Connected');
	})
	.on('error', function(err) {
		checkState('Rally','Disconneted');
	})
}

var bitbucketStatusWatch = function bitbucketStatus() {
	bitbucketStatusWatchAlive = true;
	request
	.get(target_url.bitbucket_link)
	.on('response', function(response) {
		checkState('Bitbucket','Connected');
	})
	.on('error', function(err) {
		checkState('Bitbucket','Disconneted');
	})
}

/*
 * Turn on/off watch
 */
exports.turnOnWatch = function(){
	var loop_time = 5000;
	setInterval(function(){devStatusWatch()},loop_time);
	setInterval(function(){dev1StatusWatch()},loop_time);
	setInterval(function(){stageStatusWatch()},loop_time);
	setInterval(function(){stage1StatusWatch()},loop_time);
	setInterval(function(){ltStatusWatch()},loop_time);
	setInterval(function(){prodStatusWatch()},loop_time);
	setInterval(function(){jenkinsStatusWatch()},loop_time);
	setInterval(function(){rallyStatusWatch()},loop_time);
	setInterval(function(){bitbucketStatusWatch()},loop_time);
}

exports.turnOffWatch = function(){
	clearInterval(devStatusWatch);
	devStatusWatchAlive = false;
	clearInterval(dev1StatusWatch);
	dev1StatusWatchAlive = false;
	clearInterval(stageStatusWatch);
	stageStatusWatchAlive = false;
	clearInterval(stage1StatusWatch);
	stage1StatusWatchAlive = false;
	clearInterval(ltStatusWatch);
	ltStatusWatchAlive = false;
	clearInterval(prodStatusWatch);
	prodStatusWatchAlive = false;
	clearInterval(jenkinsStatusWatch);
	jenkinsStatusWatchAlive = false;
	clearInterval(rallyStatusWatch);
	rallyStatusWatchAlive = false;
	clearInterval(bitbucketStatusWatch);
	bitbucketStatusWatchAlive = false;
}

/*
 * Check individual status of hosts
 */
exports.checkStatus = function(arg1){
	var serviceAvialableFor = {
			server:'Dev',
			server:'Dev1',
			server:'Stage',
			server:'Stage1',
			server:'Lt',
			server:'Prod',
			server:'Jenkins',
			server:'Rally',
			server:'Bitbucket'
	};
	var avialable = false;
	for ( var service in serviceAvialableFor.server) {
		if(arg1 == service)
			avialable = true;
	}
	if(avialable = true){
		switch (arg1) {
		case 'Dev':
			devStatusWatch();
			break;
		case 'Dev1':
			dev1StatusWatch();
			break;
		case 'Stage':
			stageStatusWatch();
			break;
		case 'Stage1':
			stage1StatusWatch();
			break;
		case 'Lt':
			ltStatusWatch();
		case 'Prod':
			prodStatusWatch();
			break;
		case 'Jenkins':
			jenkinsStatusWatch();
			break;
		case 'Rally':
			rallyStatusWatch();
			break;
		case 'Bitbucket':
			bitbucketStatusWatch();
			break;
		default:
			notification.consoleNotify('Wrong Argument !',arg1);
		break;
		}
	}
}

/*
 * Individual trigger status check
 */
exports.triggerAliveOrDead = function(arg1){
	switch (arg1) {
	case 'Dev':
		if(devStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Dev1':
		if(dev1StatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Stage':
		if(stageStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Stage1':
		if(stage1StatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Lt':
		if(ltStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Prod':
		if(prodStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Jenkins':
		if(jenkinsStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Rally':
		if(rallyStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	case 'Bitbucket':
		if(bitbucketStatusWatchAlive == true)
			return true;
		else
			return false;
		break;
	default:
		notification.consoleNotify('Wrong Argument !',arg1);
	break;
	}
}

