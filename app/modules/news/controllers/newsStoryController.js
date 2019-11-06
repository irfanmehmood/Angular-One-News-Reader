personalApp.controller('newsStoryController', function($rootScope,$scope, $http, $routeParams, $sce, $location, ngMeta) {

    $scope.pageClass = 'page-news-story';
    var id = $routeParams.id;

    $scope.go = function ( term ) {
        var path = '/news/search/' + term.keyword;
        $location.path( path );
    };

    $http.get($rootScope.API_URL + '/api/v1.0/feed/item/id/' + id).success(function(data) {
        //console.log(data);
        if (data === 'false') {
            console.log("No news found")
        } else {
            $scope.story = data[0];
            var body = data[0].description;
            body = body.replace(/font-size:1.2em/g, "font-size:1em");
            body = body.replace(/'style="font-size:1em"'/g, "");

            /* Aljazeers */
            body = body.replace('<span style="color: #8e8e8e !important;">Source:</span>', "");
            body = body.replace('<span style="color: #212121 !important;">Al Jazeera News And Agencies</span>', "");
            body = body.replace('<span style="color: #212121 !important;">Al Jazeera News</span>', "");
            body = body.replace('<span style="color: #212121 !important;">News Agencies</span>', "");

            $scope.my_html = body;

            $scope.keyWords = JSON.parse(data[0].keyWords);
            $scope.relatedItems = data[1];
            ngMeta.setTitle("News - " + data[0].title); //Title = Eluvium | Playlist
            //ngMeta.setDescription("News - " + data[0].title);
            ngMeta.setTag('description', "News - " + data[0].title);

        }

        //console.log($scope.relatedItems);
    });
});
