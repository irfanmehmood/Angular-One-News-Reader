'use strict';

var personalApp = angular.module('personalApp', [
    'ngRoute',
    'ngAnimate',
    'ngtimeago',
    'chart.js',
    'ngMeta',
    'Setup.config']).run(function($rootScope, ENV, ngMeta) {
        $rootScope.ENV = 'development';
        $rootScope.API_URL = ENV.api;
        ngMeta.init();
    })
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        }
      }]
    )
    .filter('clean_url', function () {
        return function (value) {
            value = value.replace(/\s+/g,"+");
            return value;
        };
    })
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })
    .config(function($routeProvider, ngMetaProvider, $locationProvider) {
      ngMetaProvider.useTitleSuffix(true);
      ngMetaProvider.setDefaultTitleSuffix(' | IrfanMehmood.com');
      $locationProvider.html5Mode(true).hashPrefix('!');



    $routeProvider
        .when('/', {
            templateUrl: 'app/views/homeView.html',
            controller: "homeController",
            data: {
              meta: {
                'title': 'Home',
                'description': 'Irfan Mehmood - Freelance - Contractor - London'
              }
            }
        })
        .when('/home', {
            templateUrl: 'app/views/homeView.html',
            controller: "homeController",
            data: {
              meta: {
                'title': 'Home',
                'description': 'Irfan Mehmood - Freelance - Contractor - London'
              }
            }
        })
        .when('/news', {
            templateUrl: 'app/modules/news/views/newsView.html',
            controller: 'newsController',
            data: {
              meta: {
                'title': 'News',
                'description': 'Irfan Mehmood - Freelance - Contractor - London'
              }
            }
        })
        /*
        .when('/news/story/:id', {
            templateUrl: 'app/modules/news/views/newsStoryView.html',
            controller: 'newsStoryController'
        })
        */
        .when('/news/story/:id/:slug', {
            templateUrl: 'app/modules/news/views/newsStoryView.html',
            controller: 'newsStoryController'
        })
        .when('/news/keywords/trending', {
            templateUrl: 'app/modules/news/views/keywordsReportView.html',
            controller: "keywordsReportController"
        })
        .when('/news/category/:category?', {
            templateUrl: 'page-news-category.html',
            controller: 'newsCategoryController'
        })
        .when('/news/channels/:companySlug/:category/:pageNo?', {
            templateUrl: 'app/modules/news/views/newsChannelsView.html',
            controller: 'newsChannelsController'
        })
        .when('/news/source/:source', {
            templateUrl: 'page-news-source.html',
            controller: 'newsSourceController'
        })
        //Set :page as optional parameter for the search page route
        .when('/news/search/:term/:pageNo?', {
            templateUrl: 'app/modules/search/views/searchView.html',
            controller: 'searchController'
        })
        .when('/about', {
            templateUrl: 'app/modules/about/views/aboutMeView.html',
            controller: "aboutController",
            data: {
              meta: {
                'title': 'About Me',
                'description': 'Irfan Mehmood - Freelance - Contractor - London'
              }
            }
        })
        .when('/news/about', {
            templateUrl: 'app/views/aboutSiteView.html',
            controller: "",
            data: {
              meta: {
                'title': 'About Page',
                'description': 'About This is the description shown in Google search results'
              }
            }
        })
        .when('/contact', {
            templateUrl: 'app/modules/contact/contactView.html',
            controller: "",
            data: {
              meta: {
                'title': 'Contact Me',
                'description': 'Irfan Mehmood - Freelance - Contractor - London'
              }
            }
        });

});
