//var aa = 'erwrwer';
//console.log(aa);
//document.querySelector('#info_area').innerHTML  = aa;
$('#info_area').html('wrwrg');

var _doc = $(document);
var _times = 0;
var _timesTotal = 0;
var _timesObj = $('#times');
var _textObj = $('#texts');
var _startFlag = false;
_doc.on('click', '.btn-area>li', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var _this = $(this);
	var _colorObj = {
		'0': 'red',
		'1': 'yellow'
	}
	chrome.tabs.executeScript(null, {
		code: "document.body.style.backgroundColor='" + _colorObj[_this.index()] + "'"
	});
	window.close();
});

chrome.tabs.query({
	active: true,
	currentWindow: true
}, function(tabs) {
	var _doc = $(document);
	_doc.on('click', '.input-btn-area', function(e) {
		e.preventDefault();
		e.stopPropagation();
		chrome.tabs.sendMessage(tabs[0].id, {
			message: 'start',
			cishu: _timesObj.val(),
			neirong: _textObj.val()
		}, function(response) {
			console.log(response['result']);
			_timesTotal = _timesObj.val();
			_startFlag = true;
//			chrome.tabs.executeScript(null, {
//				code: 'window.location.reload()'
//			});
			window.close();
		});
	});
});

//chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//	if(request['calle'] === 'listen') {
//		if(_startFlag){
//			sendResponse({
//				status: 'ok',
//				times: ++_times,
//				timesTotal: _timesTotal,
//				wenzi: 'rtbb'
//			});
//		}else{
//			sendResponse({
//				status: 'no',
//				msg: '未填写内容'
//			});
//		}
//	} else {
//		sendResponse({});
//	};
//});