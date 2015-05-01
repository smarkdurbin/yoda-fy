'use strict';

angular.module('yodaspeak')
.controller('YodaspeakController', ['$scope', '$resource',
	function($scope, $resource) {
		$scope.english = 'This is a sentence.';
		
		$scope.searchResult = [];
		
		$scope.getResults = function() {
			$scope.searchResult = [];
			var params = {
				action: 'translate',
				english: $scope.english
			};
			
			$scope.results = $resource('/yodaspeak/:action/:english', params);

			//console.log($scope.results);
			
			$scope.results.query( { }, function (res) {
				$scope.searchResult = $scope.searchResult.concat(res);
			});
			
	    };
	}
]);
