//移动端的适配工作.动态计算屏幕的宽度，从而得到网页的fontSize大小
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //if(clientWidth>750) clientWidth=750;
            //这里限制最大的宽度尺寸，从而实现PC端的两边留白等。如果是pc站，一般不用这个限制
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

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
	if(r != null) return unescape(r[2]);
	return null;
}
