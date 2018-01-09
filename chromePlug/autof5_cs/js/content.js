console.log('xishifeng');

//chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//	if(request['message'] === 'start') {
//		console.log(request['cishu'] + '==' + request['neirong']);
//		sendResponse({
//			result: 'content_js_success'
//		});
//	} else {
//		console.log('发送失败');
//		sendResponse({
//			result: "不告诉你"
//		});
//	}
//});

//chrome.extension.sendRequest({
//	call: 'listen'
//}, function(response) {
//	if(response['status'] === 'ok') {
//		console.log(response['times'] + '==>' + response['timesTotal']);
//		if(response['times'] < response['timesTotal']) {
//			setTimeout(function() {
//				window.location.reload();
//			}, 2001);
//		} else {
//			console.log(response['wenzi']);
//			console.log('over==');
//		};
//	} else {
//		console.log(response['msg']);
//	}
//});

chrome.runtime.sendMessage({
	call: 'listen'
}, function(response) {
	if(response['status'] === 'ok') {
		console.log(response['times'] + '==>' + response['timesTotal']);
		if(response['times'] < response['timesTotal']) {
			setTimeout(function() {
				window.location.reload();
			}, 2001);
		} else {
			console.log(response['wenzi']);
			console.log('over==');
		};
	} else {
		console.log(response['msg']);
	}
});

