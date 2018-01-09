console.log('xishifeng');
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.href.split('?')[1]).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};

var _href = window.location.href;
if(_href.indexOf('music.163.com')>=0){
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	    if(message == 'Hello'){
	    	alert(message);
	    	var _songId = getUrlParam('id');
	    	alert(_songId);
	        sendResponse(_songId);
			window.open('http://www.baidu.com/?xishifengMusicId='+_songId);
	    };
	});
}else if(_href.indexOf('.baidu.com')>=0){
	var _songId = getUrlParam('xishifengMusicId');
	var _a = document.createElement('a');
	_a.setAttribute('href','http://music.163.com/song/media/outer/url?id='+_songId+'.mp3');
	_a.setAttribute('download',_songId+'.mp3');
	_a.click();
}