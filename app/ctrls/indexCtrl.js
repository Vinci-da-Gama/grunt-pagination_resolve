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