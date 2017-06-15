'use strict';//启用严格模式

// 可以用来创建一个HTTP服务
var http = require('http');
// 创建一个服务
var server = http.createServer(function(request, response){
	var requestUrl = request.url;
	switch (requestUrl){
		case '/signin':
			signin(request, response);
			break;
		case '/post':
			post(request, response);
			break;
		default:
			response.write(404,{});
			response.end();
			break;
	}
});

//启动服务
server.listen(1234, function(error){
	console.log('成功监听1234端口');
});

function signin(a, b){
	console.log('请求登录页面');
	b.end();
}

function post(a, b){
	console.log('表单提交');
	b.end();
}

