'use strict';

angular.module('musixmatch')
.controller('MusixmatchController', ['$rootScope', '$scope', '$resource',
	function($rootScope, $scope, $resource) {
		$scope.query = 'Led Zeppelin';
		
		$scope.searchResults = [];
		
		$scope.musixmatchSearch = function() {
			$scope.searchResults = [];
			var params = {
				action: 'search',
				query: $scope.query
			};
			
			$scope.results = $resource('/musixmatch/:action/:query', params);
			
			$scope.results.query( { }, function (res) {
				$scope.searchResults = $scope.searchResults.concat(res);
			});
			
	    	};
		
		$scope.getLyrics = function(track_id, track_name, artist_name, album_art) {
			$scope.lyrics = [];
			$scope.track_id = track_id;
			var params = {
				action: 'lyrics',
				track_id: track_id
			};
			
			$scope.lyricsResults = $resource('/musixmatch/:action/:track_id', params, {'query': {method: 'GET', isArray: false}});
			$scope.lyricsResults.query( { }, function (res) {
				$scope.lyrics = res;
			
				$rootScope.lyrics = $scope.lyrics.lyrics_body;
				$rootScope.track_name = track_name;
				$rootScope.artist_name = artist_name;
				$rootScope.album_art = album_art;
				
				if($rootScope.lyrics === ''){
					$rootScope.lyrics = 'Lyrics for this track are not available.\n The sith must have something to do with this.';
				}
				
				console.log(album_art);
				
				$scope.translate();
				
			});
		};
		
		$scope.translate = function() {
			$scope.yodaResult = [];

			var english = $rootScope.lyrics;
			
			english = english.replace(/\*/g, '');
			english = english.replace(/\.../g, '');
			english = english.replace(/\./g, '');
			english = english.replace('This Lyrics is NOT for Commercial use', '');

			console.log(english);
			
			var lyricsContainer = document.getElementById('lyricsContainer');
			lyricsContainer.innerHTML = 'Loading...';
			
			var params = {
				action: 'translate',
				english: english
			};
			
			$scope.results = $resource('/yodaspeak/:action/:english', params);

			$scope.results.query( { }, function (res) {
				$scope.yodaResult = $scope.yodaResult.concat(res);

				 var yodaRes = $scope.yodaResult;
				 yodaRes = yodaRes.toString();
				
				yodaRes = yodaRes.replace(/\n/g, '<br>');
				yodaRes = yodaRes.replace(/\./g, '');
				
				$scope.yodaResult = yodaRes;
				
				
				if(yodaRes.search('Application Error') !== -1){
					$rootScope.yodaLyrics = 'Yodaspeak API currently unavailable';
				} else {
					$rootScope.yodaLyrics = yodaRes;
				}
				
				
			});
			
	    };
		
			
		//$rootScope.shared = '';
		
	}
]);
