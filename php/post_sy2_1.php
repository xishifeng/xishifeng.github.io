<?php
	// 定义变量并默认设置为空值
$json_data_name = $json_data_password = '';
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$json_data_name =  test_input($_POST["name"]);
	$json_data_password =  test_input($_POST["password"]);
}

$arr = array(
	'status'=>'ok',
	'xingming'=>$json_data_name,
	'mima'=>$json_data_password
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