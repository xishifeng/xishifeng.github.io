<?php
	// 定义变量并默认设置为空值
$uname =  $pwd = "";
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$uname =  test_input($_POST["uname"]);
	$pwd =  test_input($_POST["pwd"]);
}

echo '<p>你的输入为：</p><p>'.$uname.'</p><p>'.$pwd.'</p>';
 
function test_input($data)
{
	$data = trim($data);
	$data =  stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>