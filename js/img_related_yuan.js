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
function compressImage(arrEle,index,obj, callback) {
	var img = arrEle.file, w, h;
	var fid = arrEle.id;
	var isBase = arrEle.base;
	//读取图片数据
	var reader = new FileReader();
	reader.readAsDataURL(img);
	reader.onload = function(e) {
		var data = e.target.result;
		if(img.size<=(512*1024)){
			callback({"src":reader.result,"index":index,"name":img.name,"id":fid,"isBase":isBase});
			return;
			//如果图片小于512KB则直接返回
		}
		//加载图片获取图片真实宽度和高度
		var image = new Image();
		image.src = data;
		image.onload = function() {
			w = image.width;
			h = image.height;
			var scale = w / h;
			w = obj.width || w;
			h = obj.height || (w / scale);
			var quality = 0.7; // 默认图片质量为0.7
			//生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			// 创建属性节点
			var anw = document.createAttribute("width");
			anw.nodeValue = w;
			var anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh);
			ctx.drawImage(this, 0, 0,w,h);
			// 图像质量
			if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
				quality = obj.quality;
			}
			// quality值越小，所绘制出的图像越模糊
			var base64 = canvas.toDataURL('image/jpeg', quality);
			// 回调函数返回base64的值
			callback({"src":base64,"index":index,"name":img.name,"id":fid,"isBase":"yes"});
			//回调函数，写在回调函数里的内容，在前面的代码运行完毕后再执行
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
			var file = _this.files[i];
			obArr.push({"file":file,"id":uid++,"base":""});
			var xx = obArr.length - 1;
			console.log(xx);
			compressImage(obArr[xx],xx, {
				width: 1000
			}, function(ob) {
				if(ob.isBase != ""){
					console.log(obArr.length);
//					obArr[ob.index].base = ob.src;
					console.log(xx);
					obArr[xx].base = ob.src;
					console.log(ob.index);
//					console.log(ob.src);
					console.log(obArr);
				}
				var newEle = document.createElement("div");
				newEle.innerHTML = '<img src='+ob.src+' data-size='+ob.src.length+' data-id='+ob.id+' /><span class="del"></span><p>'+omit(ob.name)+'</p>';
				//如果ob.id换成uid,则存在初始化的问题，最后多有的data-id值都相等.ob.name换成_this.files[i].name存在类似问题
				form_area.insertBefore(newEle,form_area.children[0]);
				//.children[0]得到的一定是第一个HTML节点type = 3
			});
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
		if(obArr){
			$.each(obArr, function(i,n) {
				console.log(i,n.base);
				if(n.base === ""){
					loadAjax1(n);
				}else{
					loadAjax2(n.base);
					obArr = [];
					//上传之后，把obArr置空
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





