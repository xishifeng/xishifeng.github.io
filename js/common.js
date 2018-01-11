//移动端的适配工作.动态计算屏幕的宽度，从而得到网页的fontSize大小
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			//if(clientWidth>750) clientWidth=750;
			//这里限制最大的宽度尺寸，从而实现PC端的两边留白等。如果是pc站，一般不用这个限制
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//字符串格式化
String.prototype.stringFormat = function() {
	let formatted = this;
	for(let i of arguments){
		formatted = formatted.replace(new RegExp(`\\{${i}\\}`, 'gi'), arguments[0][i]);
	};
	return formatted;
};

String.prototype.stringFormatObj = function(){
	let formatted = this;
	for(let i in arguments[0]){
		formatted = formatted.replace(new RegExp(`\\{${i}\\}`, 'gi'), arguments[0][i]);
	};
	return formatted;
};

//从location.href里获取参数
//function getUrlParam(name) {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//	var r = decodeURI(window.location.search).substr(1).match(reg);
//	if(r != null) return unescape(r[2]);
//	return null;
//};
function getUrlParam(name) {
	let r = decodeURI(location.search).substr(1).match(new RegExp(`(^|&)${name}=([^&]*)(&|$)`));
	return r != null?unescape(r[2]):null;
};

//字符串翻转
String.prototype.fanzhuan = function() {
	let arr = this.split('');
	let [i, j=0] = [0, arr.length - 1];
	while(i < j){
		[arr[i], arr[j]] = [arr[j], arr[i]];
		i++;j--;
	};
	return arr.join('');
};

//数组去重
Array.prototype.quchong = function() {
	this.sort();
	var re = [this[0]];
	for(var i = 0; i < this.length; i++) {
		if(this[i] != re[re.length - 1]) {
			re.push(this[i]);
		}
	}
	return re;
}

//数组排序
Array.prototype.paixu = function() {
	for(var i = 0; i < this.length; i++) {
		for(var j = i; j < this.length; j++) {
			if(this[i] < this[j]) {
				var _temp = this[i];
				this[i] = this[j];
				this[j] = _temp;
			}
		}
	}
}

String.prototype.replaceAll = function(s1, s2) {　　
	return this.replace(new RegExp(s1, 'gm'), s2);
}

function newPaixu(a, b) {
	return b - a;
}

function suiJi(a, b) {
	return Math.random() > 0.5 ? 1 : -1;
}

//var aa = new Array();
//aa = [1,2,3,3,-5,99,-777,0,-1,4,4];
//console.log(aa);
//console.log(aa.sort(suiJi));//不能写成newPaixu()，括号不能加
//aa.sort(newPaixu);类似这样可以实现数组从小大到排列

//去除空白节点
function cleanWhitespace(element) {
	for(var i = 0; i < element.childNodes.length; i++) {
		var node = element.childNodes[i];
		if(node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
			node.parentNode.removeChild(node);
		}
	}
}

//获取对象长度

function getLen(obj){
	return Object.keys(obj).length;
};