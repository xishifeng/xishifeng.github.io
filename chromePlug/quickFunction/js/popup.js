var _doc = $(document);
_doc.on('click', '#editBtn', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var _this = $(this);
	if(_this.attr('data-isclick') == 'off'){
		_this.attr('data-isclick','on');
		chrome.tabs.executeScript(null, {
			code: "document.body.contentEditable='true';document.designMode='on';"
		});
	}else{
		_this.attr('data-isclick','off');
		chrome.tabs.executeScript(null, {
			code: "document.body.removeAttribute('contentEditable');document.designMode='off';"
		});
	};
	//window.close();
});

_doc.on('click', '#editNewTagBtn', function(e) {
	e.preventDefault();
	e.stopPropagation();
	chrome.tabs.executeScript(null, {
		code: "document.write('<html contenteditable>');"
	});
});

_doc.on('click', '#noPicBtn', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var _this = $(this);
	if(_this.attr('data-isclick') == 'off'){
		_this.attr('data-isclick','on');
		chrome.tabs.executeScript(null, {
			file: "js/nopic.js"
		});
	}else{
		_this.attr('data-isclick','off');
		chrome.tabs.executeScript(null, {
			code: "location.reload();"
		});
	};
});

_doc.on('click', '#bianfengLogin', function(e) {
	e.preventDefault();
	e.stopPropagation();
	chrome.tabs.executeScript(null, {
		file: "js/bianfenglogin.js"
	});
});