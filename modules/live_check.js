/*
 * Author : rohit.8859@gmail.com
 * Module : Check status of target
 */
var request = require('../node_modules/request');
var target_url = require('./target_urls');
var status = require('./status');
var notification = require('./notifications');
var loop_time = 5000;

let lastDevState = '';
let lastDev1State = '';
let lastStageState = '';
let lastStage1State = '';
let lastLtState = '';
let lastProdState = '';
let lastJenkinsState = '';
let lastRallyState = '';
let lastBitbucketState = '';

devStatus();
dev1Status();
stageStatus();
stage1Status();
ltStatus();
prodStatus();
jenkinsStatus();
rallyStatus();
bitbucketStatus();

function checkState(target,newState) {
	switch (target) {
	case 'Dev':
		if(newState!== lastDevState){
			if(newStatus == 'Connected'){
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
			if(newStatus == 'Connected'){
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
			if(newStatus == 'Connected'){
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
			if(newStatus == 'Connected'){
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

function devStatus() {
	setInterval(function(){
		request
		.get(target_url.dev_link)
		.on('response', function(response) {
			checkState('Dev','Connected');
		})
		.on('error', function(err) {
			checkState('Dev','Disconneted');
		})
	}, loop_time);
}

function dev1Status() {
	setInterval(function(){
		request
		.get(target_url.dev1_link)
		.on('response', function(response) {
			checkState('Dev1','Connected');
		})
		.on('error', function(err) {
			checkState('Dev1','Disconneted');
		})
	}, loop_time);
}

function stageStatus() {
	setInterval(function(){
		request
		.get(target_url.stage_link)
		.on('response', function(response) {
			checkState('Stage','Connected');
		})
		.on('error', function(err) {
			checkState('Stage','Disconneted');
		})
	}, loop_time);
}

function stage1Status() {
	setInterval(function(){
		request
		.get(target_url.stage1_link)
		.on('response', function(response) {
			checkState('Stage1','Connected');
		})
		.on('error', function(err) {
			checkState('Stage1','Disconneted');
		})
	}, loop_time);
}

function ltStatus() {
	setInterval(function(){
		request
		.get(target_url.lt_link)
		.on('response', function(response) {
			checkState('Lt','Connected');
		})
		.on('error', function(err) {
			checkState('Lt','Disconneted');
		})
	}, loop_time);
}

function prodStatus() {
	setInterval(function(){
		request
		.get(target_url.prod_link)
		.on('response', function(response) {
			checkState('Prod','Connected');
		})
		.on('error', function(err) {
			checkState('Prod','Disconneted');
		})
	}, loop_time);
}

function jenkinsStatus() {
	setInterval(function(){
		request
		.get(target_url.jenkins_link)
		.on('response', function(response) {
			checkState('Jenkins','Connected');
		})
		.on('error', function(err) {
			checkState('Jenkins','Disconneted');
		})
	}, loop_time);
}

function rallyStatus() {
	setInterval(function(){
		request
		.get(target_url.rally_link)
		.on('response', function(response) {
			checkState('Rally','Connected');
		})
		.on('error', function(err) {
			checkState('Rally','Disconneted');
		})
	}, loop_time);
}

function bitbucketStatus() {
	setInterval(function(){
		request
		.get(target_url.bitbucket_link)
		.on('response', function(response) {
			checkState('Bitbucket','Connected');
		})
		.on('error', function(err) {
			checkState('Bitbucket','Disconneted');
		})
	}, loop_time);
}