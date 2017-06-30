/*
 * Author : rohit.8859@gmail.com
 * Test module : checking individual status of triggers
 */

var live = require('../modules/live_check')
var a = live.triggerAliveOrDead('Dev1');
console.log(a)