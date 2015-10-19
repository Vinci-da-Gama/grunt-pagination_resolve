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