//公用id选择器
function SE(id){
	return document.getElementById(id);
}

//处理图片文件名
function omit(str){
	var newArr = [];
	var arr = str.split('.');
	var nSt = arr[0].length > 2 ? (arr[0].charAt(0) + 'XX' + arr[0].charAt(arr[0].length - 1)) : arr[0];
	newArr.push(nSt,arr[1]);
	return newArr.join('.');
}

//清除对应file列表的指定索引对象
function removeOb(arr,eq){
	for(var i = 0;i<arr.length;i++){
		if(arr[i].id === eq){
			arr.splice(i,1);
			return arr;
		}
	}
}

//压缩图片并预览，设置压缩临界值
function compressImage(file, obj, callback) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		var data = e.target.result;
		if(file.size<=(512*1024)){
			callback(reader.result);
			return;//如果图片小于512KB则直接返回
		}
		//加载图片获取图片真实宽度和高度
		var image = new Image();
		image.src = data;
		image.onload = function() {
			var w = image.width;
			var h = image.height;
			var scale = w / h;
			w = obj.width || w;
			h = obj.height || (w / scale);
			var quality = 0.7; // 默认图片质量为0.7
			var canvas = document.createElement('canvas');//生成canvas
			var ctx = canvas.getContext('2d');
			// 创建属性节点
			//var anw = document.createAttribute("width");anw.nodeValue = w;canvas.setAttributeNode(anw);
			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(this, 0, 0,w,h);
			if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
				quality = obj.quality;// 图像质量,quality值越小，所绘制出的图像越模糊
			}
			var base64 = canvas.toDataURL('image/jpeg', quality);
			callback(base64);//回调函数，写在回调函数里的内容，在前面的代码运行完毕后再执行
		};
	};
}

//ajax之后的图片返回
function imgPre(src){
	var aa = new Image();
	aa.src = "./php/"+src;
	$("#show_area").append(aa);
}

//图片小于512KB时的提交
function loadAjax1(ob){
	//正常的提交流
	console.log("this picture is less than 512KB");
	return false;
}

//图片大于512KB时的提交
function loadAjax2(str){
	console.warn("this picture is more than 512KB");
	$.ajax({
		url: './php/img_upload.php',
		type: 'post',
		data: {
			img: str
		},
		dataType: 'json',
		timeout: 200000,
		success: function(response) {
			if(response.ecd == '0') {
				alert('成功');
				console.log(response);
				imgPre(response.result);
				return true;
			} else {
				return alert(response.msg);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			if(textStatus == 'timeout') {
				a_info_alert('请求超时');
				return false;
			}
			alert(jqXHR.responseText);
		}
	});
}

//主体事件
window.onload = function(){
	var obArr = [];//初始化的file上传列表
	var uid = 0;//初始化的file上传列表对应文件id
	var img_input = SE("img_input");
	var form_area = SE("form_area");
	img_input.onchange = function(){
		var _this = this;
		for(var i = 0;i<_this.files.length;i++){
			!function(i){
				compressImage(_this.files[i], {
					width: 300
				}, function(base64) {
					var newEle = document.createElement("div");
					newEle.innerHTML = '<img src='+base64+' data-size='+base64.length+' data-id='+uid+' /><span class="del"></span><p>'+omit(_this.files[i].name)+'</p>';
					obArr.push({"file":_this.files[i],"id":uid++,"base":base64});
					form_area.insertBefore(newEle,form_area.children[0]);//.children[0]得到的一定是第一个HTML节点type = 3
				});
			}(i);
		}
		console.log(obArr);
	}
	
	form_area.onclick = function(e){
		var _this = this;
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.nodeName.toLowerCase() === "span"&&target.className == "del"){
			var ss = Number(target.previousSibling.getAttribute("data-id"));
			removeOb(obArr,ss);
			_this.removeChild(target.parentNode);
			//.parentElement只在IE中有效，不是标准的写法..parentNode是标准的写法
			console.log(obArr);
		}
	}
	
	$("#btn1").click(function(){
		if(obArr.length){
			console.log(obArr.length);
			$.each(obArr, function(i,n) {
				console.log(i,n.file.size);
				if(n.file.size <= (512*1024)){
					loadAjax1(n);
				}else{
					loadAjax2(n.base);
					obArr = [];//上传之后，把obArr置空
				}
			});
		}else{
			console.warn("no file!");
			return false;
		}
	})
	
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#btn1").click();
		}
	})
}





