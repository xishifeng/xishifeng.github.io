console.log('xishifeng');
var _btn = document.querySelector('#downBtn');
_btn.onclick = function(){
	chrome.runtime.sendMessage('Hello', function(response){
	    document.write(response);
	});
};
