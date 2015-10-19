(function () {
	/**
	* rcit Module
	*
	* This is Main App Module...
	*/
	angular.module('rcit', ['ui.bootstrap', 'rcit.service', 'rcit.router', 'rcit.ctrl', 'rcit.dir', 'rcit.cust.dir']);
	/**
	* app Router Module
	* router module... */
	angular.module('rcit.router', ['ui.router']);
	angular.module('rcit.service', []);
	angular.module('rcit.ctrl', []);
	/**
	* directive Module
	*
	* It is directive modules... (Directive and CustDirective)
	*/
	angular.module('rcit.dir', ['rcit.service']);
	angular.module('rcit.cust.dir', ['rcit.service']);
})();