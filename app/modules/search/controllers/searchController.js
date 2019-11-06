personalApp.controller('searchController', function($scope, $rootScope, $http, $routeParams, isotopeInit) {

    //We set initial page as 1 for monogdb logic
    $scope.pageNo = $routeParams.pageNo ? $routeParams.pageNo : 1;
    $scope.pageClass = 'page-news-story';

    /* This is neede to increase page value in pagination nav url, as otherwise angular concat numbers as strings */
    $scope.parseInt = parseInt;

    $scope.term = $routeParams.term;

    $http.get($rootScope.API_URL + '/api/v1.0/feed/item/searchFeedItems/' + $scope.term + "/" + $scope.pageNo).success(function(data) {
        $scope.newsItems = data[0];
        $scope.totalPages = data[1];
        //console.log($scope.totalPages);
    });


    $scope.range = function(n) {
        return new Array(n);
    };

    /* All the items have been created and binded with data */
    /* Do the pretend Document Ready needed for initalising isotope and attach events to buttons */

    $scope.$on('onItemsCreatedEvent', function (onItemsCreatedEventDoThis) {
        isotopeInit.innit();
        //console.log("I am here");
    });

});