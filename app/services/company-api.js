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