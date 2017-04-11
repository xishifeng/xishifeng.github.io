<?php
//定义变量并默认设置为空值
$pwd = $login_time = $login_state = $url = '';
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$pwd =  test_input($_POST["pwd"]);
	$login_time =  test_input($_POST["login_time"]);
}

if($pwd == "xishifeng"){
	$login_state = 1;
	$url = 'tec1.html';
}else{
	$login_state = 0;
	$url = '';
}
$arr = array(
	'pwd'=>$pwd,
	'login_time'=>$login_time,
	'state'=>$login_state,
	'url'=>$url
);
//;不能少
echo json_encode($arr);
   
function test_input($data)
{
	$data = trim($data);
	$data =  stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

?>