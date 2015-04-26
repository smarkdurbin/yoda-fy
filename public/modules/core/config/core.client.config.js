'use strict';

// Core module config
angular.module('core').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Dashboard', 'dashboard', 'item', '/dashboard', true);
		Menus.addMenuItem('topbar', 'Search', 'search', 'item', '/search', true);
	}
]);