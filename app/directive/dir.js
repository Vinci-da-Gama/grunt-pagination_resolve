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