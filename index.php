<?php
$crawlers = array("linkedinbot",
"bingbot",
"yahoo",
"msnbot",
"yahooseeker",
"baiduspider",
"quora",
"whatsapp",
"telegram",
"facebook",
"twitter",
"pinterest",
"google");
$isSocialCrawler = false;
foreach ($crawlers as $crawler) :
  if (stripos($_SERVER['HTTP_USER_AGENT'], $crawler) !== false){
    $isSocialCrawler = true;
    break;
  }
endforeach;
$desc = substr(strip_tags($obj->description),0,200);
$isNewsStoryPage = strpos($_SERVER['REQUEST_URI'], 'news/story/');

$metaDescription = '<meta name="description" content="{{ngMeta.description}}" />';
if ($isNewsStoryPage !== false && $isSocialCrawler) {
    $urls = explode("/news/story/", $_SERVER['REQUEST_URI']);
    //var_dump($urls[1]);
    $NewUrls = explode("/", $urls[1]);
    $id = $NewUrls[0];
    //var_dump($id);
    //exit;
    $json = file_get_contents('http://151.80.38.74:3000/api/v1.0/feed/item/id/' . $id);
    $obj = json_decode($json);
    $obj = $obj[0];
    $imageUrl = "http://www.irfanmehmood.com/assets/images/irfanmehmood.jpg";
    $desc = strip_tags($obj->description);
    ?>
    <!DOCTYPE html>
        <html>
            <head>
                <title><?php echo $obj->title; ?></title>
                <meta name="description" content="<?php echo $desc; ?>" />
                <meta property="og:title" content="<?php echo $obj->title; ?>" />
                <meta property="og:url" content="http://www.irfanmehmood.com/news/story/<?php echo $id; ?>/<?php echo $NewUrls[0];?>" />
                <meta property="og:description" content="<?php echo $desc; ?>" />
                <meta prefix="og: http://ogp.me/ns#" property="og:image" content="<?php echo $imageUrl; ?>" />
                <meta property="og:image" content="<?php echo $imageUrl; ?>" />

                <!-- etc. -->
            </head>
            <body>
                <p><?php echo strip_tags($obj->description); ?></p>
                <img src="<?php echo $imageUrl; ?>">
            </body>
        </html>
    <?php
    exit;
}
?>
<!DOCTYPE html>
<html lang="en" ng-app="personalApp" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <base href="/">
    <meta content="utf-8" http-equiv="encoding">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <!-- Arbitrary tags -->
    <meta property="og:type" content="{{ngMeta['og:type']}}" />
    <meta property="og:locale" content="{{ngMeta['og:locale']}}" />
    <meta name="author" content="{{ngMeta['author']}}" />
    <!-- OR <meta name="author" content="{{ngMeta.author}}" /> -->
    <meta name="description" content="{{ngMeta.description}}" />
    <meta name="author" content="" />
    <meta prefix="og: http://ogp.me/ns#" property="og:image" content="http://www.irfanmehmood.com/assets/images/irfanmehmood.jpg" />
    <title ng-bind="ngMeta.title"></title>
    <link rel="icon" href="../../favicon.ico">
    <!-- Bootstrap core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/styles.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="bower_components/angular-chart.js/dist/angular-chart.css">
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]>
    <script src="assets/js/bootstrap_sticky/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/bootstrap_sticky/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Bootstrap core JavaScript
================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-route/angular-route.js"></script>
    <script src="node_modules/angular-animate/angular-animate.js"></script>
    <script src="bower_components/ngMeta/dist/ngMeta.min.js"></script>
    <script src="assets/js/lib/ngtimeago.js"></script>
    <script src="app/config.js"></script>
    <script src="app/app.js"></script>
    <script src="app/shared/nav/navController.js"></script>
    <script src="app/shared/isotope/directive/isotopeDirective.js"></script>
    <script src="app/shared/isotope/factory/isotopeFactory.js"></script>
    <script src="app/modules/news/controllers/newsController.js"></script>
    <script src="app/modules/news/controllers/newsStoryController.js"></script>
    <script src="app/modules/news/controllers/newsChannelsController.js"></script>
    <script src="app/modules/search/controllers/searchController.js"></script>
    <script src="app/modules/about/controllers/aboutController.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/bootstrap_sticky/ie10-viewport-bug-workaround.js"></script>
    <script src="bower_components/Chart.js/Chart.js"></script>
    <script src="bower_components/angular-chart.js/dist/angular-chart.js"></script>
    <script src="app/modules/news/controllers/keywordsReportController.js"></script>

    <script>
        //For accordin on about pag
        personalApp.directive('a', function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {

                    var disable = false;
                    //alert(attrs.href.substring(1, 9));
                    if (attrs.href.substring(1, 9) === 'collapse'
                            || attrs.href === '#newsMnu'
                            || attrs.href === '#carousel-slider'
                            || attrs.href === '#paging') {
                        disable = true;
                    }

                    if(disable) {
                        elem.on('click', function(e){
                            e.preventDefault();
                        });
                    }
                }
            };
        });

        // A $( document ).ready() block.
        $( document ).ready(function() {
            $("#searchButton").click(function(e){
                e.preventDefault();
                if ($("#searchTerm").val().length > 2) {
                    window.location = "/news/search/" + $("#searchTerm").val();
                }
            });
        });
    </script>

</head>

<body>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-71471420-1', 'auto');
    ga('send', 'pageview');

</script>
<!-- Fixed navbar -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">Irfan Mehmood</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse pull-right">
            <ul class="nav navbar-nav" ng-controller="navController">
                <li ng-repeat="navLink in navLinks" ng-class="navClass('{{navLink.Title}}')">
                    <a href='/{{navLink.Title}}'>{{navLink.LinkText}}</a>
                </li>
                <li class="dropdown">
                    <a href="#newsMnu" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">News<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/news">News</a></li>
                        <li><a href="/news/channels/bbc/headlines">Channels</a></li>
                        <li><a href="/news/keywords/trending">Trending</a></li>
                        <!--<li><a href="#/news/about">About</a></li>-->
                    </ul>
                </li>
            </ul>
            <form class="navbar-form navbar-left" role="search" id="searchFom">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search News" id="searchTerm">
                    <span class="input-group-btn">
                        <button type="submit" class="btn btn-default" id="searchButton">Go</button>
                    </span>
                </div>
            </form>
        </div><!--/.nav-collapse -->
    </div>
</nav>
<!-- Page Content -->
<div class="container ">
        <div ng-view class="view-slide-in"></div>
</div>
<footer class="footer">

</footer>


</body>
</html>
