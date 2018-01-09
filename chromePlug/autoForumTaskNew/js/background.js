var _times360Forum = 0;
var _timesTotal360Forum = 22;
var _timesTieba = 0;
var _timesTotalTieba = 10;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	if(request['call'] === 'listen360') {
		sendResponse({
			status: 'ok',
			times: ++_times360Forum,
			timesTotal: _timesTotal360Forum,
			wenzi: 'shui360==over'
		});
	} else if(request['call'] === 'listenTieba') {
		//百度贴吧的目前无法使用，会被阻止
		sendResponse({
			status: 'ok',
			times: ++_timesTieba,
			timesTotal: _timesTotalTieba,
			wenzi: 'shuiTieba==over'
		});
	} else {
		sendResponse({
			msg: '监听失败'
		});
	};
	return true;
});