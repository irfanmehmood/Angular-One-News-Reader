personalApp.controller('aboutController', function($rootScope, $scope) {
    $scope.$emit('newPageLoaded', { 'title': 'Some Page', 'description': 'blah' });
    $rootScope.pageTitle = "Irfan Mehmood - About Me";
});
personalApp.controller('homeController', function($rootScope, $scope) {
    $rootScope.pageTitle = "Irfan Mehmood - IrfanMehmood.com";
});
personalApp.controller('contactController', function($rootScope, $scope) {
    $rootScope.pageTitle = "Irfan Mehmood - Contact Me";
});
