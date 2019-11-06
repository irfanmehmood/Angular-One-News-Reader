personalApp.controller('newsChannelsController', function($rootScope,$scope, $http, $routeParams, $sce, isotopeInit, $location) {

    $scope.pageClass = 'page-browse';

    /*
     $scope.sourceSelected = $routeParams.source;

     $scope.categorySelected = $routeParams.category;
     */

    /* This is neede to increase page value in pagination nav url, as otherwise angular concat numbers as strings */
    $scope.parseInt = parseInt;


    $scope.loadNews= function (pageNo) {
        console.log($scope.categorySelected._id);
        console.log($scope.sourceSelected._id.slug);


        var path = '/news/channels/' + $scope.sourceSelected._id.slug + '/' + $scope.categorySelected._id + '/' + pageNo;
        $location.path( path );

        /*
         $http.get($rootScope.API_URL + '/api/v1.0/feed/listFeedItemsBySourceAndCategory/' + $scope.sourceSelected._id.slug + '/' + $scope.categorySelected._id + '/' + pageNo).success(function(data) {
         $scope.newsItems = data[0];
         $scope.totalPages = data[1];

         });
         */
    };


    $http.get($rootScope.API_URL + '/api/v1.0/feed/listFeedCategories').success(function(data) {
        $scope.categories = data;
        //We have to create this JSON object manually to set the selected option , also had to use track by _id to the selectbox
        $scope.categorySelected = {_id:$routeParams.category,total:3};
    });

    $http.get($rootScope.API_URL + '/api/v1.0/feed/listFeedSources').success(function(data) {
        $scope.sources = data;

        for (i = 0;i < data.length; i++) {
            if (data[i]._id.slug == $routeParams.companySlug) {
                $scope.sourceSelected = data[i];
                break;
            }
        }
        //We have to create this JSON object manually to set the selected option , also had to use track by _id to the selectbox
        //$scope.sourceSelected = {_id:,total:3};
    });

    $scope.pageNo = $routeParams.pageNo ? $routeParams.pageNo : 1;
    $http.get($rootScope.API_URL + '/api/v1.0/feed/listFeedItemsBySourceAndCategory/' + $routeParams.companySlug + '/' + $routeParams.category + '/' + $scope.pageNo).success(function(data) {
        $scope.newsItems = data[0];
        $scope.totalPages = data[1];
        console.log($scope.newsItems);

    });

    $scope.range = function(n) {
        return new Array(n);
    };

    /* All the items have been created and binded with data */
    /* Do the pretend Document Ready needed for initalising isotope and attach events to buttons */
    /**/
    $scope.$on('onItemsCreatedEvent', function (onItemsCreatedEventDoThis) {
        isotopeInit.innit();
    });
});
