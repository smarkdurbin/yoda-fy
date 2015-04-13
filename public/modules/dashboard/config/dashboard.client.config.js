'use strict';

// Configuring the Articles module
angular.module('dashboard').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dashboard', 'dashboard', '/dashboard');
	}
]);