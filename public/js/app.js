/**
 * Author : rohit.8859@gmail.com
 * Module : #
 */
'use strict';
var slm = angular.module('slm',['ngRoute']);
slm.config(['$routeProvider', '$locationProvider', '$provide', function($routeProvider, $locationProvider, $provide) {
	$routeProvider
    .when('/profile',{
    	templateUrl : '',
    	controller : ''
    })
    .when('/preferences',{
    	templateUrl : '',
    	controller : ''
    })
    .when('/passwordchange',{
    	templateUrl : '',
    	controller : ''
    })
    .when('/admin/user-edit',{
    	templateUrl : '',
    	controller : ''
    })
    .when('/report',{
    	templateUrl : '',
    	controller : ''
    })
    .when('/contact',{
    	templateUrl : '',
    	controller : ''
    })
    .when('/about',{
    	templateUrl : '',
    	controller : ''
    })
}])