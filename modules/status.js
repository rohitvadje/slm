/*
 * Author : rohit.8859@gmail.com
 * Module : Local status data
 */
var urls = require('./target_urls')
exports.local = {
	data : [
	        {
	        	name : 'Dev',
	        	url : urls.dev_link, 
	        	status : 0,
	        	image : 'dev_image_src'
	        },
	        {
	        	name : 'Dev1',
	        	url : urls.dev1_link,
	        	status : 0,
	        	image : 'dev1_image_src'
	        },
	        {
	        	name : 'Stage',
	        	url : urls.stage_link,
	        	status : 0,
	        	image : 'stage_image_src'
	        },
	        {
	        	name : 'Stage1',
	        	url : urls.stage1_link,
	        	status : 0,
	        	image : 'stage1_image_src'
	        },
	        {
	        	name : 'Lt',
	        	url : urls.lt_link,
	        	status : 0,
	        	image : 'lt_image_src'
	        },
	        {
	        	name : 'Prod',
	        	url : urls.prod_link,
	        	status : 0,
	        	image : 'prod_image_src'
	        },
	        {
	        	name : 'Jenkins',
	        	url : urls.jenkins_link,
	        	status : 0,
	        	image : 'jenkins_image_src'
	        },
	        {
	        	name : 'Rally',
	        	url : urls.rally_link,
	        	status : 0,
	        	image : 'rally_image_src'
	        },
	        {
	        	name : 'Bitbucket',
	        	url : urls.bitbucket_link,
	        	status : 0,
	        	image : 'bitbucket_image_src'
	        }        
	        ]
};
