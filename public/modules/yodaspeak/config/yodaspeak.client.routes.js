'use strict';

//Setting up route
angular.module('yodaspeak').config(['$stateProvider',
	function($stateProvider) {
		// Yodaspeak state routing
		$stateProvider.
		state('yodaspeak', {
			url: '/yodaspeak',
			templateUrl: 'modules/yodaspeak/views/yodaspeak.client.view.html'
		});
	}
]);