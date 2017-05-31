//字符串格式化
String.prototype.stringFormat = function(){
	var formatted = this;
	for(var i = 0;i < arguments.length;i++){
		var _regexp = new RegExp('\\{'+ i + '\\}','gi');
		formatted = formatted.replace(_regexp, arguments[i]);
	};
	return formatted;
}

//从location.href里获取参数 
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	(r != null) && (return unescape(r[2]));
	return null;
}
