(function () {
	var rM = angular.module('rcit.router');

	rM.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider) {
			
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('index', {
			url: '/',
			templateUrl: './partial/pagination-resolvehttp.html',
			controller: 'IndexCtrl',
			resolve: {
				CompanyList: ['CompanyAPI', '$q', function (CompanyAPI, $q) {
					return CompanyAPI.contentQuery(10, 1);
				}]
			}
		});

	}]);

})();