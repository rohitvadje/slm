var app = angular.module('slmApp', []);
app.controller('mainCtrl', function($scope, $http) { 
	
	$scope.liveImg = 'Green.png';
	$scope.deadImg = 'Red.png';
	$scope.status = function() {		
		setInterval(function() {
			$http({
				method: 'GET',
				url: 'http://localhost:3002/getstatus',				
			}).then(function successCallback(response) {						
				if(response.data.result[0].status==1){ //DEV
					_.set($scope, response.data.result[0].image, $scope.liveImg);
				}
				else if(response.data.result[0].status==0){
					_.set($scope, response.data.result[0].image, $scope.deadImg);
				}	
				
				if(response.data.result[1].status==1){ //DEV1
					_.set($scope, response.data.result[1].image, $scope.liveImg);
				}
				else if(response.data.result[1].status==0){
					_.set($scope, response.data.result[1].image, $scope.deadImg);
				}
				
				if(response.data.result[2].status==1){ //STAGE
					_.set($scope, response.data.result[2].image, $scope.liveImg);
				}
				else if(response.data.result[2].status==0){
					_.set($scope, response.data.result[2].image, $scope.deadImg);
				}
				
				if(response.data.result[3].status==1){ //STAGE1
					_.set($scope, response.data.result[3].image, $scope.liveImg);
				}
				else if(response.data.result[3].status==0){
					_.set($scope, response.data.result[3].image, $scope.deadImg);
				}
				
				if(response.data.result[5].status==1){ //STAGE1
					_.set($scope, response.data.result[5].image, $scope.liveImg);
				}
				else if(response.data.result[5].status==0){
					_.set($scope, response.data.result[5].image, $scope.deadImg);
				}
				
			}, function errorCallback(response) {				
				var date = new Date();
				var dateTime = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+'   '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
				//console.log('Server is not reachable');
				console.clear();
			});
		},5000);
	};
	$scope.status();
	
	$scope.confirmDisable = false;
	$scope.disablePush = function(){
		$scope.confirmDisable = true;
	};
	
});
