'use strict';

// Posts controller
angular.module('posts').controller('PostsController', [ '$scope', '$stateParams', '$location', 'Authentication', 'Posts', '$rootScope', 'Socket', '$http',
	function( $scope, $stateParams, $location, Authentication, Posts, $rootScope, Socket, $http) {
		
		$scope.likes = 0;
	  	$scope.isLiked = false;
		
		Socket.on('post.created', function(newPost) {
			console.log(newPost);
			$scope.posts = Posts.query();
			$scope.$apply();
		});
		
		Socket.on('post.liked', function(newLike) {
			console.log(newLike);
			$scope.posts = Posts.query();
			$scope.$apply();
		});
		
		$scope.authentication = Authentication;

		// Create new Post
		$scope.create = function() {
			// Create new Post object
			
			console.log($rootScope.album_art);
			
			if($rootScope.album_art === ''){
				$rootScope.album_art = 'http://placehold.it/350&text=No+Album+Art';	
			}
			
			var post = new Posts ({
				name: this.name,
				description: this.description,
				title: this.title,
				//test: $rootScope.yodaLyrics,
				track: {
					yodaLyrics: $rootScope.yodaLyrics,
					artist: $rootScope.artist_name,
					name: $rootScope.track_name,
					albumArt: $rootScope.album_art
				}
				
			});
			console.log(post);

			// Redirect after save
			post.$save(function(response) {
				$location.path('posts/' + response._id);
				
				$rootScope.yodaLyrics = '';
				$rootScope.artist_name = '';
				$rootScope.track_name = '';
				$rootScope.album_art = '';

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Post
		$scope.remove = function(post) {
			if ( post ) { 
				post.$remove();

				for (var i in $scope.posts) {
					if ($scope.posts [i] === post) {
						$scope.posts.splice(i, 1);
					}
				}
			} else {
				$scope.post.$remove(function() {
					$location.path('posts');
				});
			}
		};

		// Update existing Post
		$scope.update = function() {
			var post = $scope.post;

			post.$update(function() {
				$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Posts
		$scope.find = function() {
			$scope.posts = Posts.query();
		};

		// Find existing Post
		$scope.findOne = function() {
			$scope.post = Posts.get({ 
				postId: $stateParams.postId
			});
			
		};
		
		
		$scope.likeThis = function(postIndex) {
		    var post = $scope.posts[postIndex];
			
		    $http.put('posts/like/' + post._id).success(function() {
			    
		    }).success(function(data){

			    $scope.isLiked=true;
			    
			    data = angular.fromJson(data);
			    	    
			    if ($scope.posts[postIndex].likes.length !== data.likes.length) {
				    post.likes.push($scope.authentication.user._id);
			    }

		    });


         };   
		
		
	}
]);

angular.module('posts').filter('words', function () {
  return function (input, words) {
    if (isNaN(words)) {
      return input;
    }
    if (words <= 0) {
      return '';
    }
    if (input) {
      var inputWords = input.split(/\s+/);
      if (inputWords.length > words) {
        input = inputWords.slice(0, words).join(' ') + '\u2026';
      }
    }
    return input;
  };
});