angular.module('gitGet')
    .directive('usersList', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/directives/usersList.html',
            controller: 'gitUserCtrl'
        };
    })
    .directive('userDetails', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/directives/userDetails.html',
            controller: 'gitUserCtrl'
        };
    })
    .directive('compareRepositories', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/directives/compareTable.html',
            controller: 'gitUserCtrl'
        };
    });