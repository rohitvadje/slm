var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
            $scope.urlList = {
                "urls": [{
                    environment: 'Dev',
                    url: 'https://slimcs-dev.cloudapps.cisco.com/slim/',
                    img: 'dev_image_src'
                }, {
                    environment: 'Dev1',
                    url: 'https://slimcs1-dev.cloudapps.cisco.com/slim/',
                    img: 'dev1_image_src'
                }, {
                    environment: 'Stage',
                    url: 'https://slimcs-stage.cloudapps.cisco.com/slim/',
                    img: 'stage_image_src'
                }, {
                    environment: 'Stage1',
                    url: 'https://slimcs1-stage.cloudapps.cisco.com/slim/',
                    img: 'stage1_image_src'
                }, {
                    environment: 'Prod',
                    url: 'https://slimcs.cloudapps.cisco.com/slim/',
                    img: 'prod_image_src'
                }]
            };

            $scope.repeatCall = function() {

                setInterval(function(urlList) {
                        $http({
                            method: 'GET',
                            url: 'http://localhost:3000/pingTarget?urlList=' + urlList,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
                            }
                        }).then(function successCallback(response) {
                            if (response.data.toString() == 'true')
                                $scope[image] = "Green.png";
                            else
                                $scope[image] = "Red.png";
                        }, function errorCallback(response) {
                            $scope[image] = "White.png";
                            //console.clear();
                        }, 5000);
                    };
                });
            }
            });
            