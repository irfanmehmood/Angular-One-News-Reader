/*  Problem:
 This directive was created to solve the problem with isotope.
 This was due to ng-repeat creating dynamic content from api

 Solution
 Create directive to listen out for items creation callback, once last
 item has been created, we fire onItemsCreatedEvent declared in our controller method

 */

personalApp.directive('ngMyisotope', function($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last === true) {
            scope.$emit('onItemsCreatedEvent');
        }
    }
});