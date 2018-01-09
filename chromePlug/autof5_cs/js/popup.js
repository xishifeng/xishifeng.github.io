//var aa = 'erwrwer';
//console.log(aa);
//document.querySelector('#info_area').innerHTML  = aa;
//$('#info_area').html('wrwrg');

//var _doc = $(document);
var _times = 0;
var _timesTotal = 11;
//var _timesObj = $('#times');
//var _textObj = $('#texts');
//var _startFlag = false;

//chrome.tabs.query({
//	active: true,
//	currentWindow: true
//}, function(tabs) {
//	var _doc = $(document);
//	_doc.on('click', '.input-btn-area', function(e) {
//		e.preventDefault();
//		e.stopPropagation();
//		chrome.tabs.sendMessage(tabs[0].id, {
//			message: 'start',
//			cishu: _timesObj.val(),
//			neirong: _textObj.val()
//		}, function(response) {
//			console.log(response['result']);
//			_timesTotal = _timesObj.val();
//			_startFlag = true;
//			window.close();
//		});
//	});
//});

//chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//	if(request['call'] === 'listen') {
//		sendResponse({
//			status: 'ok',
//			times: ++_times,
//			timesTotal: _timesTotal,
//			wenzi: 'rtbb'
//		});
//	} else {
//		sendResponse({});
//	};
//});

//chrome.runtime.onMessage.addListener(
//function(request, sender, sendResponse) {
//	console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
//	if(request['call'] === 'listen') {
//		sendResponse({
//			status: 'ok',
//			times: ++_times,
//			timesTotal: _timesTotal,
//			wenzi: 'rtbb'
//		});
//	} else {
//		sendResponse({});
//	};
//	return true;
//});