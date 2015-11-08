angular.module('gitGetServices', ['ngResource'])
    .factory('gitHubApi', function($http) {

        var gitApiRequest = function(userId, type, successCallBack, errorCallBack) {
            var url = 'https://api.github.com/users/',
                callback = '?callback=JSON_CALLBACK';

            switch (type) {
                case 'userRepositories':
                    url = url + userId + '/repos' + callback;
                    break;
                case 'userDetails':
                default:
                    url = url + userId + callback;
            }

            return $http({
                method: 'JSONP',
                url: url
            }).then(function successCallback(response) {
                successCallBack(response);
            }, function errorCallback(response) {
                errorCallBack(response);
            });
        };

        return {
            USER_REPOSITORIES: 'userRepositories',
            USER_DETAILS: 'userDetails',

            getUserDetails: function(userId, success, error) {
                return gitApiRequest(userId, this.USER_DETAILS, success, error);
            },

            getUserRepositories: function(userId, success, error) {
                return gitApiRequest(userId, this.USER_REPOSITORIES, success, error);
            }
        };
    });

