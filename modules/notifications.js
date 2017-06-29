var dt = require('./date_time');
exports.consoleNotify = function(target,message){
	console.log(target+' is '+message+'	at '+dt.DateTime())
}
