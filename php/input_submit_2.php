<?php
	// 定义变量并默认设置为空值
$json_data_tel = $json_data_email = '';
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$json_data_tel =  test_input($_POST["tel"]);
	$json_data_email =  test_input($_POST["email"]);
}

$arr = array(
	'tel'=>$json_data_email,
	'email'=>$json_data_tel
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