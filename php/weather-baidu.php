<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
	$city = $_GET["city"];
	$ak = 'oUbvWIaGpQoaVB7tK0R0AWbQMohYMOG1';
	//自己的百度开发者中心ak码
	$url="http://api.map.baidu.com/telematics/v3/weather?location=".$city."&output=json&ak=".$ak;
	$content = file_get_contents($url); 
	echo $content;
?>