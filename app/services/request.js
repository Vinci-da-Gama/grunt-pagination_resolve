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