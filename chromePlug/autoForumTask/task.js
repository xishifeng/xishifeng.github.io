console.log('xishifeng');
var _urlSign = "http://cq.sanguosha.com/bbs/plugin.php?id=dsu_paulsign:sign";
var _urlSign360 = "http://bbs.u.360.cn/forum-2620-1.html";
var _urlQianglou = 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=200434&extra=page%3D1&page=2000';
var _urlShuilou = 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=199474&highlight=%E6%B0%B4%E6%A5%BC';
var _urlYaoyiyao = 'http://cq.sanguosha.com/bbs/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall';
var _url = window.location.href;

switch (_url){
	case 'http://cq.sanguosha.com/bbs/plugin.php?id=dsu_paulsign:sign':
		forumGuanSign();
		break;
	case 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=199474&highlight=%E6%B0%B4%E6%A5%BC':
		forumGuanShuilou();
		break;
	case 'http://cq.sanguosha.com/bbs/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall':
		forumGuanYaoyiyao();
		break;
	case 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=200434&extra=page%3D1&page=2000':
		forumGuanQianglou();
		break;
	case 'http://bbs.u.360.cn/forum-2620-1.html':
		forum360Sign();
		break;
	case 'https://tieba.baidu.com/f?kw=%C8%FD%B9%FA%C9%B1%B4%AB%C6%E6&fr=ala0&tpl=5':
		baiduTiebaSign();
		break;
	default:
		break;
}

function forumGuanSign(){
	//官方论坛签到
	document.getElementById('kx').click();
	document.getElementById('todaysay').value='签到签到';
	document.querySelector('a[onclick^="showWindow(\'qwindow\', \'qiandao\', \'post\', \'0\');return false"]').click();
}

function forum360Sign(){
	//360论坛签到
	document.getElementById('daily_click').click();
	console.log('qiandao success');
	location.replace('http://www.baidu.com');
}

function baiduTiebaSign(){
	var clickBtn = document.querySelector('.j_signbtn.sign_btn_bright.j_cansign');
	clickBtn.click();
	clickBtn.click();
	console.log('qiandao success');
}

function forumGuanShuilou(){
	//官方论坛水楼
	console.log('shuilou');
	var _numObj = document.getElementsByClassName('zzza_hall_top_left_infor_num')[0];
	var _num = 0;
	if(_numObj){
		_num = Number(_numObj.innerText);
	}
	console.log(_num);
	var _linkTag = document.querySelector('.zzza_tsy>a');
	if(_linkTag && _linkTag.innerText == '未完成任务'){
		setTimeout(function(){
			document.querySelector('#fastpostmessage').innerText = '本版块玩家专属水楼,随意水~~~升级福音~|';
			document.querySelector('#fastpostsubmit').click();
			window.location.reload();
		},15001);
	}else{
		location.href = 'http://cq.sanguosha.com/bbs/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall';
	}
}

function forumGuanYaoyiyao(){
	//官方论坛摇一摇
	document.querySelector('#zzza_go').click();
}

function forumGuanQianglou(){
	//官方论坛抢楼
	console.log('qianglou');
	var _arr = document.querySelectorAll('div[id^="post_"] a[onclick="setCopy(this.href, \'帖子地址复制成功\');return false;"]>em');
	if(_arr.length < 10){
		var _lastNum = Number(_arr[_arr.length-1].innerHTML);
		console.log(_lastNum);
		if((_lastNum+1)%100 === 0){
			document.querySelector('#fastpostmessage').innerText = '我来踩楼，我的愿望是兵长极传符';
			document.querySelector('#fastpostsubmit').click();
			window.location.reload();
		}else if((_lastNum+1)%100 >= 95){
			setTimeout(function(){
				window.location.reload();
			},400);
		}else if((_lastNum+1)%100 >= 85){
			setTimeout(function(){
				window.location.reload();
			},1500);
		}else if((_lastNum+1)%100 >= 75){
			setTimeout(function(){
				window.location.reload();
			},8000);
		}else{
			setTimeout(function(){
				window.location.reload();
			},30000);
		}
	}
}


