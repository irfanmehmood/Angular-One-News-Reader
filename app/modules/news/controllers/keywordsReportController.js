personalApp.controller('keywordsReportController', function($rootScope,$scope, $http) {

    $scope.pageClass = 'page-news';
    $scope.selectedDate = 'today';


    $scope.selectOptions = [
        {value: 'today', displayName: 'Today Chart'},
        {value: 'yesterday', displayName: 'Yesterday Chart'}
        /*
        {value: 'week', displayName: 'Weekly Chart'},
        {value: 'month', displayName: 'Monthly Chart'},
        {value: 'yearly', displayName: 'Yearly Chart'}
        */
    ];

    $scope.chartOptions = [
        {value: 'series', displayName: 'Series Display'},
        {value: 'pie', displayName: 'Pie Display'},
        {value: 'bar', displayName: 'Bar Display'}
    ];



    $scope.chartType = "series";
    $scope.showSeriesChart = true;
    $scope.showPieChart = false;
    $scope.showBarChart = false;


    $scope.getData = function () {


        var today = new Date();
        var date_one;
        var url = $rootScope.API_URL + '/api/v1.0/feed/' ;
        switch ($scope.selectedDate) {

            case 'today':
                url += 'listKeyWordsByDate/' + today.getFullYear()+'-'+today.getMonth()+'-'+ today.getDate();
                break;
            case 'yesterday':
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                url += 'listKeyWordsByDate/' + yesterday.getFullYear()+'-'+yesterday.getMonth()+'-'+ yesterday.getDate();
                break;
            case 'week':
                var startDate = new Date();
                startDate.setDate(today.getDate() - 7);
                startDate = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+ startDate.getDate();
                url += 'listKeyWordsBetweenDates/' +  startDate + "/" + today.getFullYear()+'-'+today.getMonth()+'-'+ today.getDate();
                break;
            case 'month':
                var startDate = new Date();
                startDate.setDate(today.getMonth() - 1);
                startDate = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+ startDate.getDate();
                url += 'listKeyWordsBetweenDates/' +  startDate + "/" + today.getFullYear()+'-'+today.getMonth()+'-'+ today.getDate();
                break;
            case 'yearly':
                var startDate = new Date();
                startDate.setDate(today.getYear() - 1);
                startDate = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+ startDate.getDate();
                url += 'listKeyWordsBetweenDates/' +  startDate + "/" + today.getFullYear()+'-'+today.getMonth()+'-'+ today.getDate();
                break;

        }

        $scope.data = [];
        $scope.labels = [];

        $http.get(url).success(function(data) {

            console.log("GetData" + $scope.selectedDate);
            $scope.keyWordsYesterday = data;
            //console.log($scope.keyWordsToday);

            var keywords = [];
            var TodaydataPoints = [];
            var dataPoints = [];

            for (var i = 0; i < data.length; i++) {

                if (i < 10) {
                    //console.log(data[i]);
                    keywords.push(data[i].keyword);
                    TodaydataPoints.push(data[i].count);
                } else {
                    break;
                }

            }



            if ($scope.chartType == 'series') {
                console.log("Hefe");
                dataPoints.push(TodaydataPoints);
                $scope.data = dataPoints;
                $scope.showSeriesChart = true;
                $scope.showPieChart = false;
                $scope.showBarChart = false;

            } else if ($scope.chartType == 'pie'){
                //For doghnut chart
                $scope.data = TodaydataPoints;
                $scope.showSeriesChart = false;
                $scope.showPieChart = true;
                $scope.showBarChart = false;

            }  else if ($scope.chartType == 'bar'){
                //For bar chart
                dataPoints.push(TodaydataPoints);
                $scope.data = dataPoints;
                $scope.showSeriesChart = false;
                $scope.showPieChart = false;
                $scope.showBarChart = true;
            }


            $scope.labels = keywords;

        });

    };

    $scope.selectedDate = 'today'
    $scope.getData();

    //January is 0! for javascript, so december is 12, but we dont need that conversion as our backend is in javascript as well
    //var mm = today.getMonth()+1;













    //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Yesterday Trendy Words'];
   // $scope.data = [        [65, 59, 80, 81, 56, 55, 40]];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

});
