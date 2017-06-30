var dt = require('./date_time');
exports.consoleNotify = function(target,message){
	console.log(target+' '+message+'	at '+dt.DateTime())
}
