<?php
	header('content-type:application/json;charset=utf8');
	
	$arr1 = [
		'imgUrl'=>'https://web.fujuhaofang.com/houseImg/small_fba86fef8cf2c8d091c233ce537ae738.jpg',
		'title'=>'第一张图sss',
		'userName'=>'小红',
		'sex'=>'nv',
		'age'=>18,
		'longTxt'=>'一念成执着沧海变荒漠轮回中 我像飞鸟经过记忆中停泊点一盏烛火那微光 能否照亮寂寞听雨声滴落看花开几朵叹昨日 怎么只剩轮廓难断的情锁眸中的淡泊一场梦 谁都无法触摸'
	];
	
	$arr2 = [
		'imgUrl'=>'https://web.fujuhaofang.com/houseImg/small_9b412a3211e1bd80575c875ee801e093.jpg',
		'title'=>'第二张图trt',
		'userName'=>'小张',
		'sex'=>'nv',
		'age'=>23,
		'longTxt'=>'我醉在 尘世中恍然若梦睁开眼 时光交错一份情 着了火一颗心 着了魔谁为谁失魂落魄'
	];
	
	$arr3 = [
		'imgUrl'=>'https://web.fujuhaofang.com/houseImg/small_8e2d46be64ef27ac4078347946ea9c46.jpg',
		'title'=>'第三张图gnnfmn',
		'userName'=>'李存勖',
		'sex'=>'nan',
		'age'=>16,
		'longTxt'=>'时光笔墨 难画你我留白 不要太多情开一朵 爱难临摹用我一生 陪你挥霍守到恒星都坠落听雨声滴落'
	];
	
	$arr4 = [
		'imgUrl'=>'https://web.fujuhaofang.com/houseImg/small_96fb813c6b265375acdb39ae4efae654.jpg',
		'title'=>'第四张图uktgktuk',
		'userName'=>'鹿晗',
		'sex'=>'nan',
		'age'=>100,
		'longTxt'=>'歌词是诗歌的一种，入乐的叫歌，不入乐的叫诗（或词）。入乐的歌在感情抒发、形象塑造上和诗没有任何区别，但在结构上、节奏上要受音乐的制约，在韵律上要照顾演唱的方便，在遣词炼字上要考虑听觉艺术的特点，因为它要入乐歌唱。歌词与诗的分别，主要是诗不一定要入乐（合乐），歌词是要合乐的。合乐成为歌曲。歌词一般是配合曲子旋律一同出现的，歌词是歌曲的本意所在。现代一般是配合音乐，便于哼唱的语句。'
	];
	
	$arr = array($arr1, $arr2, $arr3, $arr4);
	
	echo json_encode($arr);//编码为JSON字符串
?>