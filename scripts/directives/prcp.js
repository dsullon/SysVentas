'use strict';
angular.module('app')
    .directive('onErrorSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src != attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        }
    })
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
    
                    event.preventDefault();
                }
            });
        };
    });