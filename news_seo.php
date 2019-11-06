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
    $NewUrls = explode("/", $urls[1]);
    $id = $urls[0];
    //var_dump($id);
    //exit;
    $json = file_get_contents('http://151.80.38.74:3000/api/v1.0/feed/item/id/' . $id);
    $obj = json_decode($json);
    $obj = $obj[0];
    $imageUrl = "http://www.irfanmehmood.com/assets/images/irfanmehmood.jpg";

    ?>
