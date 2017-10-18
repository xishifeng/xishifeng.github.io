console.log('xishifeng');
//console.log(document.getElementById('kx'));
//console.log(document.getElementById('todaysay'));
//console.log(document.querySelector('a[onclick^="showWindow("]'));
var _urlSign = "http://cq.sanguosha.com/bbs/plugin.php?id=dsu_paulsign:sign";
var _urlSign360 = "http://bbs.u.360.cn/forum-2620-1.html";
var _urlQianglou = 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=200434&extra=page%3D1&page=800';
var _urlShuilou = 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=199474&highlight=%E6%B0%B4%E6%A5%BC';
var _urlYaoyiyao = 'http://cq.sanguosha.com/bbs/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall';
var _url = window.location.href;
if(_url == _urlSign){
	document.getElementById('kx').click();
	document.getElementById('todaysay').value='签到签到';
	document.querySelector('a[onclick^="showWindow(\'qwindow\', \'qiandao\', \'post\', \'0\');return false"]').click();
}else if(_url == _urlSign360){
	document.getElementById('daily_click').click();
}else if(_url == _urlQianglou){
	console.log('qianglou');
	var _arr = document.querySelectorAll('div[id^="post_"] a[onclick="setCopy(this.href, \'帖子地址复制成功\');return false;"]>em');
	if(_arr.length < 10){
		var _lastNum = Number(_arr[_arr.length-1].innerHTML);
		console.log(_lastNum);
		if((_lastNum+1)%100 === 0){
			document.querySelector('#fastpostmessage').innerText = '我来踩楼，我的愿望是兵长极传符';
			document.querySelector('#fastpostsubmit').click();
			window.location.reload();
		}else{
			setTimeout(function(){
				window.location.reload();
			},1000);
		}
	}
}else if(_url == _urlShuilou){
	console.log('shuilou');
	var _num = Number(document.getElementsByClassName('zzza_hall_top_left_infor_num')[0].innerText);
	console.log(_num);
	if(document.getElementsByClassName('zzza_rwzs')[0].innerText.indexOf('任务已完成') === 2){
		document.querySelector('.zzza_tsy>a').click();
	}else{
		setTimeout(function(){
			document.querySelector('#fastpostmessage').innerText = '本版块玩家专属水楼,随意水~~~升级福音~|';
			document.querySelector('#fastpostsubmit').click();
			window.location.reload();
		},15001);
	}
}else if(_url == _urlYaoyiyao){
	console.log('other');
	document.querySelector('#zzza_go').click();
}else{
	console.log('other');
}


