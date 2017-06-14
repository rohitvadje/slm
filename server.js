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
var jenkins_url = 'https://ci1.cisco.com/login?from=%2F';
var rally_url = 'https://sso.cisco.com/autho/forms/mCDClogin.html';
var bitbucket_url = 'https://gitscm.cisco.com/login';

var loop_time = 3000;

var d = new Date();

var status_old = {
    result : [
        {
            url : 'DEV',
            status : 0
        },
        {
            url : 'DEV1',
            status : 0
        },
        {
            url : 'STAGE',
            status : 0
        },
        {
            url : 'STAGE1',
            status : 0
        },
        {
            url : 'LT',
            status : 0
        },
        {
            url : 'PROD',
            status : 0
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
var status_new = {
     result : [
        {
            url : 'DEV',
            status : 0
        },
        {
            url : 'DEV1',
            status : 0
        },
        {
            url : 'STAGE',
            status : 0
        },
        {
            url : 'STAGE1',
            status : 0
        },
        {
            url : 'LT',
            status : 0
        },
        {
            url : 'PROD',
            status : 0
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
    console.log('Welcome to Smart SLIM Environment Doctor');
}

/**
*   First Checkup
*   First time when server starts, it needs to send current status of server to users.
*   In order to send that status to users, this function checks initial status of Environments for first time
*/
function firstCheck(){
	request(dev_url, function (error) {
		if(error)
			console.log('First check : dev down');                                            
	}).setMaxListeners(0);       
	request(dev1_url, function (error) {
		if(error)
			console.log('First check : dev 1 down');                                            
	}).setMaxListeners(0);       
	request(stage_url, function (error) {
		if(error)
			console.log('First check : stage down');                                            
	}).setMaxListeners(0); 
	request(stage1_url, function (error) {
		if(error)
			console.log('First check : stage 1 down');                                            
	}).setMaxListeners(0); 
	request(lt_url, function (error) {
		if(error)
			console.log('First check : lt down');                                            
	}).setMaxListeners(0);
	request(prod_url, function (error) {
		if(error)
			console.log('First check : prod down');                                            
	}).setMaxListeners(0);     
	request(jenkins_url, function (error) {
		if(error)
			console.log('First check : jenkins down');                                            
	}).setMaxListeners(0);
	request(rally_url, function (error) {
		if(error)
			console.log('First check : rally down');                                            
	}).setMaxListeners(0);
	request(bitbucket_url, function (error) {
		if(error)
			console.log('First check : bitbucket down');                                            
	}).setMaxListeners(0);

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
    // jenkinsStatus();
    // rallyStatus();
    // bitbucketStatus();  
    notificationControl();
}

/**
*   Notification Control
*/
function notificationControl(){
     setInterval(function(){
         if(JSON.stringify(status_old) != JSON.stringify(status_new)){
             if(status_old.result[0].status!=status_new.result[0].status){ //DEV
                notifyUser('DEV','DOWN');
             }
             if(status_old.result[1].status!=status_new.result[1].status){ //DEV 1
                notifyUser('DEV 1','DOWN');
             }
             if(status_old.result[2].status!=status_new.result[2].status){ //STAGE
                notifyUser('STAGE','DOWN');
             }
              if(status_old.result[3].status!=status_new.result[3].status){ //STAGE1
                notifyUser('STAGE 1','DOWN');
             }
             if(status_old.result[4].status!=status_new.result[4].status){ //LT
                notifyUser('LT','DOWN');
             }
             if(status_old.result[5].status!=status_new.result[5].status){ //PROD
                notifyUser('PROD','DOWN');
             }
             if(status_old.result[6].status!=status_new.result[6].status){ //JENKINS
                //notifyUser('JENKINS','DOWN');
             }
             if(status_old.result[7].status!=status_new.result[7].status){ //RALLY
                //notifyUser('RALLY','DOWN');
             }
             if(status_old.result[8].status!=status_new.result[8].status){ //BITBUCKET
                //notifyUser('BITBUCKET','DOWN');
             }                          
         }
        
         status_old.result = status_new.result; 
     },5000);
}

function notifyUser(env,state){
    console.log(env+' is '+state);
}

/**
*   Check status every loop_time seconds
*/
function devStatus() {
    setInterval(function(){
            request(dev_url, function (error) {
                if(error){
                   status_new.result[0].status = 0;                    
                    //console.log('DEV error');
                }
                else{
                   status_new.result[0].status = 1;
                    //console.log('DEV success');
                }
            }).setMaxListeners(0);       
    }, loop_time);
}


function dev1Status() {
    setInterval(function(){
            request(dev1_url, function (error) {
                if(error){
                   status_new.result[1].status = 0;                    
                    //console.log('DEV1 error');
                }
                else{
                   status_new.result[1].status = 1;
                    //console.log('DEV1 success');
                }
            }).setMaxListeners(0);       
    }, loop_time);
}

function stageStatus() {
    setInterval(function(){
            request(stage_url, function (error) {
                if(error){
                   status_new.result[2].status = 0;                    
                    //console.log('STAGE error');
                }
                else{
                   status_new.result[2].status = 1;
                    //console.log('STAGE success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}

function stage1Status() {
    setInterval(function(){
            request(stage1_url, function (error) {
                if(error){
                   status_new.result[3].status = 0;                    
                    //console.log('STAGE 1 error');
                }
                else{
                   status_new.result[3].status = 1;
                    //console.log('STAGE 1 success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}


function ltStatus() {
    setInterval(function(){
            request(lt_url, function (error) {
                if(error){
                   status_new.result[4].status = 0;                    
                    //console.log('LT error');
                }
                else{
                   status_new.result[4].status = 1;
                    //console.log('LT success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}

function prodStatus() {
    setInterval(function(){
            request(prod_url, function (error) {
                if(error){
                   status_new.result[5].status = 0;                    
                    //console.log('PROD error');
                }
                else{
                   status_new.result[5].status = 1;
                    //console.log('PROD success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}

function jenkinsStatus() {
    setInterval(function(){
            request(jenkins_url, function (error) {
                if(error){
                   status_new.result[6].status = 0;                    
                    //console.log('JENKINS error');
                }
                else{
                   status_new.result[6].status = 1;
                    //console.log('JENKINS success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}

function rallyStatus() {
    setInterval(function(){
            request(rally_url, function (error) {
                if(error){
                   status_new.result[7].status = 0;                    
                    //console.log('RALLY error');
                }
                else{
                   status_new.result[7].status = 1;
                    //console.log('RALLY success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}

function bitbucketStatus() {
    setInterval(function(){
            request(bitbucket_url, function (error) {
                if(error){
                   status_new.result[8].status = 0;                    
                    //console.log('BITBUCKET error');
                }
                else{
                   status_new.result[8].status = 1;
                    //console.log('BITBUCKET success');
                }
            }).setMaxListeners(0);        
    }, loop_time);
}

/*
var serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://slim-bookmarks.firebaseio.com"
});*/

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
       
app.get('/pingWebSite',function(req,res){
	
/*    request(req.query.urlToGo, function (error) {
	if(error){
		res.send(false);
		console.log(req.query.res+' down !');
	}
	else{
		res.send(true);
	}
	}).setMaxListeners(0);*/    
     res.writeHead(200, {"Content-Type": "application/json"});
     var json = JSON.stringify(status_new);
     res.end(json);
});

app.get('/pingTarget',function(req,res){
    console.log(req.query.urlList.toString());
});

	app.listen(3002, function () {
	  console.log('Example app listening on port 3002!')
	})

