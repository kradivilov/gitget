angular.module('gitGet')
    .controller('gitUserCtrl', ['$scope', 'gitHubApi', '$timeout',
        function ($scope, gitHubApi, $timeout){
            $scope.gitUserId = 'user'; //default user
            $scope.users = {};
            $scope.selectedUser = {};
            $scope.maxRatedRepositories = {};
            $scope.maxRatedUser = {};
            $scope.detailsBlockShow = false;

            $scope.addGitUser = function() {
                var userId = $scope.gitUserId;

                if (userId.length > 0 && typeof ($scope.users[userId]) === 'undefined') {
                    gitHubApi.getUserRepositories(userId, function(resp) {
                        if (resp.data.data.length) {
                            $scope.users[userId] = {
                                reps: resp.data.data,
                                allStars: 0
                            };
                            $scope.gitUserId = '';
                            $scope.showDetails(userId);
                            compareRepositories();
                        } else {
                            $scope.message = 'User Not Found!!!';
                            $timeout(function(){
                                $scope.message = '';
                            }, 3000);
                        }
                    });
                }
            };

            $scope.removeGitUser = function(userId) {
                if (typeof ($scope.users[userId]) !== 'undefined') {

                    if (typeof ($scope.selectedUser.user.login) !== 'undefined'
                        && $scope.selectedUser.user.login === userId) {
                        $scope.detailsBlockShow = false;
                    }
                    $scope.maxRatedUser = {};
                    delete $scope.users[userId];
                    delete $scope.maxRatedRepositories[userId];
                    compareRepositories();
                }
            };

            $scope.showDetails = function(userId) {
                if (typeof ($scope.users[userId].user) === 'undefined') {
                    gitHubApi.getUserDetails(userId, function(resp) {
                        $scope.users[userId].user = resp.data.data;
                        $scope.detailsBlockShow = true;
                        $scope.selectedUser = $scope.users[userId];
                    });
                } else {
                    $scope.detailsBlockShow = true;
                    $scope.selectedUser = $scope.users[userId];
                }
            };

            var compareRepositories = function() {
                angular.forEach($scope.users, function(reposArr, key) {
                    var starsCnt = 0;
                    if (reposArr.reps.length) {
                        $scope.maxRatedRepositories[key] = reposArr.reps[0];
                        reposArr.reps.map(function(repo) {
                            if ($scope.maxRatedRepositories[key].stargazers_count < repo.stargazers_count) {
                                $scope.maxRatedRepositories[key] = repo;
                            }
                            starsCnt += repo.stargazers_count;
                        });
                        $scope.users[key].allStars = starsCnt;

                        if (Object.keys($scope.users).length > 1 && starsCnt > 0) {

                            if (typeof ($scope.maxRatedUser.allStars) === 'undefined'
                                || $scope.maxRatedUser.allStars < starsCnt) {
                                $scope.maxRatedUser = {
                                    userId: key,
                                    allStars: starsCnt
                                };
                            }
                        }
                    }
                });
            };
        }]);

