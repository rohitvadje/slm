var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {           
	$scope.repeatCall = function() {
		setInterval(function(urlList) {
			$http({
				method: 'GET',
				url: 'http://localhost:3002/getstatus',				
			}).then(function successCallback(response) {
				console.log(response.data);
			}, function errorCallback(response) {
				$scope[image] = "White.png";
				console.clear();
			}, 5000);
		};
	});
}
});
