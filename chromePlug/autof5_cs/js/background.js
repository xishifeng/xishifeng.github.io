
var _times = 0;
var _timesTotal = 11;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	if(request['call'] === 'listen') {
		sendResponse({
			status: 'ok',
			times: ++_times,
			timesTotal: _timesTotal,
			wenzi: 'rtbb'
		});
	} else {
		sendResponse({});
	};
	return true;
});