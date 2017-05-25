<?php
	// 定义变量并默认设置为空值
$json_data_name = $json_data_img = '';
if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$json_data_name =  test_input($_POST["name"]);
	$json_data_img =  test_input($_POST["img"]);
}

$arr = array(
	'status' =>"ok",
	'src'=>$json_data_img,
	'name'=>$json_data_name
);

echo json_encode($arr);
 
function test_input($data)
{
	$data = trim($data);
	$data =  stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>