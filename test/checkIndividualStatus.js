/*
 * Author : rohit.8859@gmail.com
 * Test module : checking individual status of avialable hosts
 */

var live = require('../modules/live_check')
live.checkStatus('Dev');
live.checkStatus('Dev1');
live.checkStatus('Stage');
live.checkStatus('Stage1');
live.checkStatus('Bitbucket');
