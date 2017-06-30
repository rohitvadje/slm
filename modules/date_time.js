/*
 * Author : rohit.8859@gmail.com
 * Module : Export date and time
 */
var d = new Date();

exports.dateTime = function () {
    return Date();
};
exports.date = function(){
	return d.getDate();
}
exports.month = function(){
	return d.getMonth()+1;
}
exports.year = function(){
	return d.getFullYear();
}
