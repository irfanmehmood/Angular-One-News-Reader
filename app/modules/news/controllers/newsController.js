personalApp.controller('newsController', function($rootScope, $scope, $http, $location, isotopeInit) {

    $scope.pageClass = 'page-news';

    //$rootScope.pageTitle = "News Dashboard";

    $scope.$emit('newPageLoaded', { 'title': 'Some Page', 'description': 'blah' });

    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    //January is 0! for javascript, so december is 12, but we dont need that conversion as our backend is in javascript as well
    //var mm = today.getMonth()+1;


    today = today.getFullYear()+'-'+today.getMonth()+'-'+ today.getDate();
    yesterday = yesterday.getFullYear()+'-'+yesterday.getMonth()+'-'+ yesterday.getDate();

    $http.get($rootScope.API_URL + '/api/v1.0/feed/listKeyWordsByDate/' + today).success(function(data) {

        $scope.keyWordsToday = data;
        //console.log($scope.keyWordsToday);
    });

    $http.get($rootScope.API_URL + '/api/v1.0/feed/listKeyWordsByDate/' + yesterday).success(function(yesterdayData) {

        $scope.keyWordsYesterday = yesterdayData;
        //console.log($scope.keyWordsToday);
    });


    $scope.go = function ( term ) {
        var path = '/news/search/' + term.keyword;
        $location.path( path );
    };

    /* All the items have been created and binded with data */
    /* Do the pretend Document Ready needed for initalising isotope and attach events to buttons */

    $scope.$on('onItemsCreatedEvent', function (onItemsCreatedEventDoThis) {
        isotopeInit.innit();
    });

    $http.get($rootScope.API_URL + '/api/v1.0/feed/items/dashboardNews').success(function(data) {
        $scope.newsItems = data;
    });

});