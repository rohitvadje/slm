var express = require('express');
var app = express();
var path = require('path');
var request=require('request');
var admin = require("firebase-admin");

var dev_url = 'https://slimcs-dev.cloudapps.cisco.com/slim/';
var dev1_url = 'https://slimcs1-dev.cloudapps.cisco.com/slim/';
var stage_url = 'https://slimcs-stage.cloudapps.cisco.com/slim/';
var stage1_url = 'https://slimcs1-stage.cloudapps.cisco.com/slim/';
var lt_url = 'https://slimcs-lt.cloudapps.cisco.com/slim/';
var prod_url = 'https://sso.cisco.com/autho/forms/CECLogin.html';
var jenkins_url = 'https://ci1.cisco.com/';
var rally_url = 'https://sso.cisco.com/autho/forms/mCDClogin.html';
var bitbucket_url = 'https://gitscm.cisco.com/login';

var loop_time = 5000;

var d = new Date();

var status_old = {
    result : [
        {
            url : 'DEV',
            status : 0,
            image : 'dev_image_src'
        },
        {
            url : 'DEV1',
            status : 0,
            image : 'dev1_image_src'
        },
        {
            url : 'STAGE',
            status : 0,
            image : 'stage_image_src'
        },
        {
            url : 'STAGE1',
            status : 0,
            image : 'stage1_image_src'
        },
        {
            url : 'LT',
            status : 0,
            image : ''
        },
        {
            url : 'PROD',
            status : 0,
            image : 'prod_image_src'
        },
        {
            url : 'JENKINS',
            status : 0,
            image : ''
        },
        {
            url : 'RALLY',
            status : 0,
            image : ''
        },
        {
            url : 'BITBUCKET',
            status : 0,
            image : ''
        }        
    ]
};
var status_new = {
     result : [
        {
            url : 'DEV',
            status : 0,
            image : 'dev_image_src'
        },
        {
            url : 'DEV1',
            status : 0,
            image : 'dev1_image_src'
        },
        {
            url : 'STAGE',
            status : 0,
            image : 'stage_image_src'
        },
        {
            url : 'STAGE1',
            status : 0,
            image : 'stage1_image_src'
        },
        {
            url : 'LT',
            status : 0
        },
        {
            url : 'PROD',
            status : 0,
            image : 'prod_image_src'
        },
        {
            url : 'JENKINS',
            status : 0
        },
        {
            url : 'RALLY',
            status : 0
        },
        {
            url : 'BITBUCKET',
            status : 0
        }        
    ]
};

/**
*   Welcome 
*/
function welcome(){
	console.log('******************* Author : Rohit Vadje *********************\n\n');
    console.log('Welcome to Smart SLIM Environment Doctor');
}

/**
*   First Checkup
*   First time when server starts, it needs to send current status of server to users.
*   In order to send that status to users, this function checks initial status of Environments for first time
*/
function firstCheck(){
	console.log('[Info] First check started');
	setTimeout(function(){ 		
		if(status_new.result[0].status==0) //DEV
			console.error('	+ Dev down');        
		if(status_new.result[1].status==0) //DEV 1
			console.error('	+ Dev 1 down');
		if(status_new.result[2].status==0) //STAGE
			console.error('	+ STAGE down');  
		if(status_new.result[3].status==0) //STAGE1
			console.error('	+ STAGE1 down');     
		if(status_new.result[4].status==0) //LT
			console.error('	+ LT down');
		if(status_new.result[5].status==0) //PROD
			console.error('	+ PROD down');
		if(status_new.result[6].status==0) //JENKINS
			console.error('	+ JENKINS down');
		if(status_new.result[7].status==0) //RALLY
			console.error('	+ RALLY down');
		if(status_new.result[8].status==0) //BITBUCKET
			console.error('	+ BITBUCKET down');
		
		console.log('[Info] First check finished. Client will get notified onwards.');
	}, 15000);	
}

/**
*   Init method
*/
function init(){
    welcome();    
    firstCheck();
    devStatus();
    dev1Status();
    stageStatus();
    stage1Status();
    ltStatus();
    prodStatus();
    jenkinsStatus();
    rallyStatus();
    bitbucketStatus();  
    notificationControl();
}

init();

/**
*   Notification Control
*/
function notificationControl(){
	console.log('[Info] Notifications started');
	setInterval(function(){
		if(JSON.stringify(status_old) != JSON.stringify(status_new)){
			if(status_old.result[0].status!=status_new.result[0].status){ //DEV
				if(status_new.result[0].status==1)
					notifyUser('DEV','UP');
				else if(status_new.result[0].status==0)
					notifyUser('DEV','DOWN');
			}
			if(status_old.result[1].status!=status_new.result[1].status){ //DEV 1
				if(status_new.result[1].status==1)
					notifyUser('DEV 1','UP');
				else if(status_new.result[1].status==0)
					notifyUser('DEV 1','DOWN');
			}
			if(status_old.result[2].status!=status_new.result[2].status){ //STAGE
				if(status_new.result[2].status==1)
					notifyUser('STAGE','UP');
				else if(status_new.result[2].status==0)
					notifyUser('STAGE','DOWN');
			}
			if(status_old.result[3].status!=status_new.result[3].status){ //STAGE1
				if(status_new.result[3].status==1)
					notifyUser('STAGE 1','UP');
				else if(status_new.result[3].status==0)
					notifyUser('STAGE 1','DOWN');
			}
			if(status_old.result[4].status!=status_new.result[4].status){ //LT
				if(status_new.result[4].status==1)
					notifyUser('LT','UP');
				else if(status_new.result[4].status==0)
					notifyUser('LT','DOWN');
			}
			if(status_old.result[5].status!=status_new.result[5].status){ //PROD
				if(status_new.result[5].status==1)
					notifyUser('PROD','UP');
				else if(status_new.result[5].status==0)
					notifyUser('PROD','DOWN');
			}
			if(status_old.result[6].status!=status_new.result[6].status){ //JENKINS
				if(status_new.result[6].status==1)
					notifyUser('JENKINS','UP');
				else if(status_new.result[6].status==0)
					notifyUser('JENKINS','DOWN');
			}
			if(status_old.result[7].status!=status_new.result[7].status){ //RALLY
				if(status_new.result[7].status==1)
					notifyUser('RALLY','UP');
				else if(status_new.result[7].status==0)
					notifyUser('RALLY','DOWN');
			}
			if(status_old.result[8].status!=status_new.result[8].status){ //BITBUCKET
				if(status_new.result[8].status==1)
					notifyUser('BITBUCKET','UP');
				else if(status_new.result[8].status==1)
					notifyUser('BITBUCKET','DOWN');
			}                          
		}
		status_old.result = status_new.result; 
	},5000);
}

function notifyUser(env,state){
	var date = new Date();
	var dateTime = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+'   '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	console.log(env+' is '+state + 'at	'+dateTime);
}

/**
*   Check status every loop_time seconds
*/
function devStatus() {
	setInterval(function(){
		request(dev_url, function (error) {
			if(error)
				status_new.result[0].status = 0;                                                        
			else
				status_new.result[0].status = 1;                                 
		}).setMaxListeners(0);       
	}, loop_time);
}

function dev1Status() {
	setInterval(function(){
		request(dev1_url, function (error) {
			if(error)
				status_new.result[1].status = 0;                                   
			else
				status_new.result[1].status = 1;                                   
		}).setMaxListeners(0);       
	}, loop_time);
}

function stageStatus() {
	setInterval(function(){
		request(stage_url, function (error) {
			if(error)
				status_new.result[2].status = 0;                                                       
			else
				status_new.result[2].status = 1;                                    
		}).setMaxListeners(0);        
	}, loop_time);
}

function stage1Status() {
	setInterval(function(){
		request(stage1_url, function (error) {
			if(error)
				status_new.result[3].status = 0;                                                        
			else
				status_new.result[3].status = 1;                                   
		}).setMaxListeners(0);        
	}, loop_time);
}

function ltStatus() {
	setInterval(function(){
		request(lt_url, function (error) {
			if(error)
				status_new.result[4].status = 0;                                                    
			else
				status_new.result[4].status = 1;              
		}).setMaxListeners(0);        
	}, loop_time);
}

function prodStatus() {
	setInterval(function(){
		request(prod_url, function (error) {
			if(error)
				status_new.result[5].status = 0;                                                       
			else
				status_new.result[5].status = 1; 
		}).setMaxListeners(0);        
	}, loop_time);
}

function jenkinsStatus() {
	setInterval(function(){
		request(jenkins_url, function (error) {
			if(error)
				status_new.result[6].status = 0;                    
			else
				status_new.result[6].status = 1;
		}).setMaxListeners(0);        
	}, loop_time);
}

function rallyStatus() {
	setInterval(function(){
		request(rally_url, function (error) {
			if(error)
				status_new.result[7].status = 0;                      
			else
				status_new.result[7].status = 1;    
		}).setMaxListeners(0);        
	}, loop_time);
}

function bitbucketStatus() {
	setInterval(function(){
		request(bitbucket_url, function (error) {
			if(error)
				status_new.result[8].status = 0;                                                   
			else
				status_new.result[8].status = 1;                                
		}).setMaxListeners(0);        
	}, loop_time);
}

app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/getstatus',function(req,res){ 
	res.writeHead(200, {"Content-Type": "application/json"});
	var json = JSON.stringify(status_new);
	res.end(json);
});

app.listen(3002, function () {
	console.log('[Info] Server listening to URL --> http://localhost:3002/')
});

