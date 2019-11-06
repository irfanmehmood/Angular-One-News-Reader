personalApp.controller('navController', function($scope, $location) {

    $scope.navLinks = [{
        Title: 'home',
        LinkText: 'HOME',
    },/* {
        Title: 'about',
        LinkText: 'ABOUT'
    }*/{
        Title: 'contact',
        LinkText: 'CONTACT'
    }];

    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

    $scope.searchTerm = '';

    $scope.searchSubmit = function () {
        var path = '/news/search/' +  $scope.searchTerm;
        $location.path( path );
    };

    $scope.isNews = function() {
        return $location.path().indexOf('news') >= 0 ? true : false;

    };

    $scope.$on('$routeChangeStart', function(next, current) {
        //This code runs on route chnage
    });

});

// your overall app controlleral
personalApp.controller('AppController', function ($scope) {

});
