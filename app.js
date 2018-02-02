angular.module('test', []).controller('indexCtrl', ['$scope', '$http', '$element', function($scope, $http, $element) {
	$scope.page = 1;
	$scope.sortBy = 'size';
	$scope.sortOptions = ['size', 'price'];
	$scope.products = [];

	$scope.changeSort = function() {
		$scope.page = 0;
		$element.find(".product-box").scrollTop(0);
		$scope.products = [];
		
	};

	$scope.getProducts = function() {
		$scope.isLoading = true;
		$http.get(`/api/products?page=${$scope.page}&sortBy=${$scope.sortBy}`)
			.then(response => {
				$scope.response = response.data;
				$scope.products = $scope.products.concat(response.data.products);
				$scope.isLoading = false;
			})
			.catch(error => console.log(`Error getting products ${error.data}`));
	};

	$scope.nextPage = function() {
		if ($scope.page < $scope.response.maxPage) {
			$scope.page++;
			$scope.getProducts();
		}

	};

	$scope.processDate = function(date) {
		let minDate = new Date(moment().subtract(1, 'week').calendar());
		return new Date(date) < minDate ? moment(date).format('LLL') : moment(date).fromNow();
	};


	function onInit() {
		$scope.getProducts();
	}

	onInit();
}]);
angular.module('test').directive('whenScrollEnds', function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            let visibleHeight = element.height(),
                threshold = 1;

            element.scroll(function(event) {
                let scrollableHeight = element.prop('scrollHeight');
                let hiddenContentHeight = scrollableHeight - visibleHeight;

                if (hiddenContentHeight - element.scrollTop() <= threshold) {
                    scope.$apply(attrs.whenScrollEnds);
                }
            });
        }
    };
});