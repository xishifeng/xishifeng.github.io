'use strict';
var _shuilouGuan = 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=205647&highlight=%E6%B0%B4%E6%A5%BC' //官方论坛==>2018年1月
var _shuilou360 = 'http://bbs.u.360.cn/thread-7657489-1-1.html' //360论坛==>2018年1月

switch(window.location.href) {
	case 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=205614&extra=page%3D1&page=6000':
		//forumGuanQianglouSp(6300, '论坛昵称：man17');//官方论坛特殊阶段抢楼
		break;
	case 'http://cq.sanguosha.com/bbs/forum.php?mod=viewthread&tid=206002&extra=page%3D1&page=6000':
		forumGuanQianglou(5, '论坛昵称：man17'); //官方论坛抢楼，群雄争霸，勇闯虎牢关
		break;
	case 'http://cq.sanguosha.com/bbs/plugin.php?id=dsu_paulsign:sign':
		forumGuanSign(); //官方论坛签到
		break;
	case _shuilouGuan:
		//1月
		forumGuanShuilou(); //官方论坛灌水
		break;
	case 'http://cq.sanguosha.com/bbs/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall':
		forumGuanYaoyiyao(); //官方论坛摇一摇
		break;
	case 'http://bbs.u.360.cn/forum-2620-1.html':
		forum360Sign(); //360论坛签到
		break;
	case _shuilou360:
		forum360Shuilou(); //360论坛灌水
		break;
	case 'https://tieba.baidu.com/p/5420056567?pn=1':
		tiebaShuilou(); //三传百度贴吧灌水
		break;
	case 'https://tieba.baidu.com/p/5420056567?pn=1#':
		tiebaShuilou(); //三传百度贴吧灌水
		break;
	default:
		break;
};

function forumGuanQianglouSp(_num, _text) {
	//官方论坛抢楼
	var _arr = document.querySelectorAll('a[id^="postnum"]>em');
	var _lastNum = Number(_arr[_arr.length - 1].innerHTML);
	console.log('qianglou==>' + _lastNum);
	if((_lastNum + 1) == _num) {
		document.querySelector('#fastpostmessage').innerText = _text;
		document.querySelector('#fastpostsubmit').click();
	} else if((_lastNum + 31) <= _num) {
		setTimeout(function() {
			window.location.reload();
		}, 30000);
	} else if((_lastNum + 13) <= _num) {
		setTimeout(function() {
			window.location.reload();
		}, 3000);
	} else if((_lastNum + 4) <= _num) {
		setTimeout(function() {
			window.location.reload();
		}, 1500);
	} else {
		setTimeout(function() {
			window.location.reload();
		}, 150);
	}
};

function forumGuanQianglou(_numWei, _text) {
	//官方论坛抢楼
	var _arr = document.querySelectorAll('a[id^="postnum"]>em');
	var _lastNum = Number(_arr[_arr.length - 1].innerHTML);
	console.log('qianglou==>' + _lastNum);
	if(_arr.length < 10) {
		var _domTemp = document.querySelectorAll('a.xw1');
		if(_domTemp.length >= _numWei && _domTemp[_numWei - 1].innerHTML === 'man17') {
			console.log('success ==> ' + _lastNum + '楼左右');
			return false;
		} else {
			if((_lastNum + 1) % 10 === _numWei) {
				document.querySelector('#fastpostmessage').innerText = _text;
				document.querySelector('#fastpostsubmit').click();
				window.location.reload();
			} else {
				setTimeout(function() {
					window.location.reload();
				}, 300);
			};
		};
	} else {
		setTimeout(function() {
			window.location.reload();
		}, 1500);
	}
};

function forumGuanSign() {
	//官方论坛签到
	if(document.getElementById('kx')) {
		document.getElementById('kx').click();
		document.getElementById('todaysay').value = '签到签到';
		document.querySelector('a[onclick^="showWindow(\'qwindow\', \'qiandao\', \'post\', \'0\');return false"]').click();
	}
	location.href = _shuilouGuan;
};

function forumGuanShuilou() {
	//官方论坛水楼
	console.log('shuilou');
	var _numObj = document.getElementsByClassName('zzza_hall_top_left_infor_num')[0];
	var _linkTag = document.querySelector('.zzza_tsy>a');
	if(_linkTag && _linkTag.innerText == '未完成任务') {
		setTimeout(function() {
			document.querySelector('#fastpostmessage').innerText = '本版块玩家专属水楼,随意水~~~升级福音~|';
			document.querySelector('#fastpostsubmit').click();
			window.location.reload();
		}, 15001);
	} else {
		location.href = 'http://cq.sanguosha.com/bbs/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall';
	}
};

function forumGuanYaoyiyao() {
	//官方论坛摇一摇
	document.querySelector('#zzza_go').click();
};


function forum360Sign() {
	//360论坛签到
	document.getElementById('daily_click').click();
	console.log('qiandao success');
	setTimeout(function(){
		location.href = _shuilou360;
	},3001)
	
};

function forum360Shuilou() {
	chrome.runtime.sendMessage({
		call: 'listen360'
	}, function(response) {
		if(response['status'] === 'ok') {
			console.log(response['times'] + '==>' + response['timesTotal']);
			if(response['times'] <= response['timesTotal']) {
				setTimeout(function() {
					document.getElementById('fastpostmessage').value = '本版块玩家专属水楼,随意水~~~升级福音~|2';
					document.getElementById('fastpostsubmit').click();
					window.location.reload();
				}, 20001);
			} else {
				console.log(response['wenzi']);
			};
		} else {
			console.log(response['msg']);
		}
	});
};
//
//function tiebaShuilou(){
//	chrome.runtime.sendMessage({
//		call: 'listenTieba'
//	}, function(response) {
//		if(response['status'] === 'ok') {
//			console.log(response['times'] + '==>' + response['timesTotal']);
//			if(response['times'] <= response['timesTotal']) {
//				document.querySelector('#ueditor_replace').innerHTML = '<p>本吧会员专属水楼，随意水~~~升级福音~|</p>'
//				document.querySelector('[title=\'Ctrl+Enter快捷发表\']').click();
//				setTimeout(function() {
//					window.location.reload();
//				}, 20001);
//			} else {
//				console.log(response['wenzi']);
//			};
//		} else {
//			console.log(response['msg']);
//		}
//	});
//};

//官方论坛获取帖子楼层数dom最初的版本，
//var _arr = document.querySelectorAll('div[id^="post_"] a[onclick="setCopy(this.href, \'帖子地址复制成功\');return false;"]>em');