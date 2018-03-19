function insertAfter( newElement, targetElement)
{
   var parent = targetElement.parentNode;
   if ( parent.lastChild == targetElement )
   {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild( newElement );
   }
   else
   {
        //如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
        parent.insertBefore( newElement, targetElement.nextSibling );
   }
};

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};

import axios from 'axios'
Vue.prototype.$http = axios;