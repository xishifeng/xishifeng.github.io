console.log('xishifeng');

function setTimeF5() {
	var _aa = new Date();
	var _nowTime = _aa.getTime();
	_aa.setHours(14);
	_aa.setMinutes(42);
	_aa.setSeconds(0);
	var _targetTime = _aa.getTime();
	var _chaZhi = _targetTime - _nowTime;
	console.log(_chaZhi);

	setTimeout(function() {
		console.log('fff');
		window.location.reload();
	}, _chaZhi);
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request['message'] === 'start') {
		console.log(request['cishu'] + '==' + request['neirong']);
		sendResponse({
			result: 'content_js_success'
		});
	} else {
		console.log('发送失败');
		sendResponse({
			result: "不告诉你"
		});
	}
});

//chrome.extension.sendRequest({
//	calle: 'listen'
//}, function(response) {
//	if(response['status'] === 'ok'){
//		console.log(response['times'] + '==>' + response['timesTotal']);
//		if(response['times'] < response['timesTotal']){
//			setTimeout(function() {
//				window.location.reload();
//			}, 1001);
//		}else{
//			console.log('success--');
//			$('.exit').html(response['wenzi']);
//		};
//	}else{
//		console.log(response['msg']);
//	}
//});