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