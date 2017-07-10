<?php
	header('content-type:application/json;charset=utf8');
	$name = isset($_GET['name'])?$_GET['name']:0;
	
    $data = '{"status":1,"info":[{"name":"小明","password":"xiaoming123","sex":"男"},{"name":"小红","password":"xiaohong123","sex":"女"},{"name":"小华","password":"xiaohua123","sex":"男"}]}';

	if($name == '小明'||$name == '小红'||$name == '小华'){
		echo $data;
	}else{
		echo '{"status":0,"info":"暂无"}';
	}
?>