'use strict';
let aa = 'https://xishifeng.github.io/chromePlug/autof5_cs/js/xiuxiu_zhuru.js';

const theScript = document.createElement('script');
//theScript.innerHTML = `alert('hellow word !!');`;
theScript.src = aa;
document.body.appendChild(theScript+'?rev='+Math.random());

//chrome.tabs.executeScript(null, {
//	file: "js/xiuxiu_zhuru.js"
//});


