<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<?php
			
			$a1 = "qweq";
			$a2 = "25";
			$a3 = 677;
			function test(){
				echo $GLOBALS['a1'];
				var_dump($GLOBALS['a2']);
				global $a3;
				echo $a3;
			}
			//test();
			print "there is a $a3";
			print "<br />";
			print "there is a ".$a3;
			
			$arr1 = array("aefs",'werwg','asewew',false,34,9.556);
			$st1 = "what a nice day!";
			echo "<br />";
			echo strlen($st1);
			var_dump(strpos($st1,'f'));
			var_dump(strpos($st1,'at'));
			var_dump($_SERVER);
			echo '这是第 “ '  . __LINE__ . ' ” 行';
			echo '这是第 “ '  . __LINE__ . ' ” 行';
			echo '该文件位于 “ '  . __FILE__ . ' ” ';
			
		?>
	</body>
</html>
