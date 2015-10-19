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
(function () {
	var cosM = angular.module('rcit');
	cosM.constant('apiUrl', 'http://api.demo.muulla.com/cms');
})();
(function () {
	var ctrlM = angular.module('rcit.ctrl');

	ctrlM.controller('IndexCtrl', ['$scope', 'CompanyList', 'CompanyAPI', 
		function($scope, CompanyList, CompanyAPI){
			var ic = $scope;

			console.log('CompanyList --> ', CompanyList);
			ic.companyAll = CompanyList.data;
			ic.pagination = CompanyList.pagination;

			ic.$watch('pagination', function (nv, ov) {
				if (nv !== ov) {
					CompanyAPI.contentQuery(ic.pagination.page_size, ic.pagination.page_number)
					.then(function (res) {
						ic.companyAll = res.data;
					});
				} else{
					console.log('pagination did not change.');
				};
			}, true);

			ic.setPerPage = function (contentPerPage) {
				ic.pagination.page_size = contentPerPage;
				ic.pagination.page_number = 1;
			};

			ic.parseAddress = function (addressSpec) {
				var addr = [];
				addressSpec.address1 ? addr.push(addressSpec.address1) : null;
				addressSpec.address2 ? addr.push(addressSpec.address2) : null;
				addressSpec.suburb ? addr.push(addressSpec.suburb) : null;
				addressSpec.state ? addr.push(addressSpec.state.split('-')[1]) : null;
				addressSpec.country ? addr.push(addressSpec.country) : null;
				addressSpec.postcode ? addr.push(addressSpec.postcode) : null;
				return addr.join(', ');
			};
	}]);

})();
(function () {
	var cdM = angular.module('rcit.cust.dir');

	

})();
(function () {
	var dM = angular.module('rcit.dir');

	dM.directive('spinnerLoader', [function(){
		return {
			// terminal: true,
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude, LoadCount) {
				var lc = $scope;
				lc.getLoadCount = LoadCount.getLoadCount;
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './partial/spinner-loader.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {}
		};
	}]);

})();
(function () {
	var cpapiM = angular.module('rcit.service');

	cpapiM.service('CompanyAPI', ['infoRequest', 'User', 'apiUrl', function(infoRequest, User, apiUrl){
		this.contentQuery = function (perPage, page) {
			var url = apiUrl + '/merchant/all/active/' + perPage + '/' + page;
			var userLocal = User.getUser();
			var headerLocal = {
				Authorization: userLocal.name + ' ' + userLocal.token
			};
			console.log('CompanyAPI: the user is --> ', userLocal);
			console.log('url: --> '+url);
			
			return infoRequest.$get(url, headerLocal);
		};
	}]);

})();
(function () {
	var rqM = angular.module('rcit.service');

	rqM.service('infoRequest', ['LoadCount', '$q', '$http', function(LoadCount, $q, $http){
		var taichi = String.fromCharCode(9775);

		this.$get = function (url, header) {
			var _der = $q.defer();
			var httpObj ={
				url: url,
				headers: header,
				method: 'GET'
			};

			LoadCount.increase();

			$http(httpObj)
			.success(function (res) {
				LoadCount.decrease();
				console.log("++++" +taichi+taichi+ " companyList: ====== ->>", res.data);
				_der.resolve(res);
			})
			.error(function(msg, status, config) {
				LoadCount.decrease();
				console.log('error message: -> '+msg+" Status: "+status+" config--> : "+config);
				_der.reject(msg);
			});

			return _der.promise;
		};

	}]);

})();
(function () {
	var ulcM = angular.module('rcit.service');

	ulcM.service('LoadCount', [function(){
		var loadCount = 0;

		this.getLoadCount = function () {
			console.log('count is: '+loadCount);
			return loadCount;
		};

		this.increase = function () {
			return ++loadCount;
		};
		this.decrease = function () {
			return --loadCount;
		};
	}]);

	ulcM.service('User', [function(){
		var name = 'Bearer';
		var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NGQxOTY4MGI1MWMxNTI2MGI5NDRmZDUiLCJpc3N1ZV9kYXRlIjoiMjAxNS0wOS0wOVQwNToxMzo1My40NThaIn0.Hk2XypA_KMUnIKdSVYnwq3Rn3QyMNSQ-e80-sZsA9bY';
		
		this.getUser = function () {
			return {
				name: name,
				token: token
			};
		};
	}]);

})();