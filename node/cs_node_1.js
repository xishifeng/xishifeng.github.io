'use strict';//启用严格模式

// 可以用来创建一个HTTP服务
var http = require('http');
// 创建一个服务
var server = http.createServer(function(request, response){
	//只要有request就会执行此函数
	console.log(request.url);
	//处理响应和请求
	response.writeHead(200, {
		'Conten-Type': 'text/html', //告诉客户端我给你的是HTML
		'key1': 'value1',
		'key2': 'value2' //可以是自定义的键值对
	});
	
	//响应体中放数据（只能是字符串）
	response.write('<h1>success request</h1>');//响应体中写入html内容
	response.end();//结束了回应
});

//启动服务
server.listen(1234, function(error){
	console.log('成功监听1234端口');
});

