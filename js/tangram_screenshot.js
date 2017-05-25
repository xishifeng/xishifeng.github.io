var clientWidth = document.documentElement.clientWidth;
var cl = clientWidth / 7.5;

var tangram = [{
	p: [{
		x: 0,
		y: 0
	}, {
		x: 3 * cl,
		y: 3 * cl
	}, {
		x: 0,
		y: 6 * cl
	}],
	width: 3 * cl,
	height: 6 * cl,
	top: 0,
	left: 0,
	color: "#67becf"
}, {
	p: [{
		x: 0,
		y: 0
	}, {
		x: 3 * cl,
		y: 0
	}, {
		x: 1.5 * cl,
		y: 1.5 * cl
	}],
	width: 3 * cl,
	height: 1.5 * cl,
	top: 0,
	left: 0,
	color: "#caff67"
}, {
	p: [{
		x: 1.5 * cl,
		y: 0
	}, {
		x: 3 * cl,
		y: 1.5 * cl
	}, {
		x: 1.5 * cl,
		y: 3 * cl
	}, {
		x: 0 * cl,
		y: 1.5 * cl
	}],
	width: 3 * cl,
	height: 3 * cl,
	top: 0,
	left: 1.5 * cl,
	color: "#ef3d61"
}, {
	p: [{
		x: 0,
		y: 0
	}, {
		x: 3 * cl,
		y: 0
	}, {
		x: 3 * cl,
		y: 3 * cl
	}],
	width: 3 * cl,
	height: 3 * cl,
	top: 0,
	left: 3 * cl,
	color: "#f9f51a"
}, {
	p: [{
		x: 1.5 * cl,
		y: 0
	}, {
		x: 1.5 * cl,
		y: 3 * cl
	}, {
		x: 0,
		y: 1.5 * cl
	}],
	width: 1.5 * cl,
	height: 3 * cl,
	top: 1.5 * cl,
	left: 3 * cl,
	color: "#a54c09"
}, {
	p: [{
		x: 0,
		y: 0
	}, {
		x: 1.5 * cl,
		y: 1.5 * cl
	}, {
		x: 1.5 * cl,
		y: 4.5 * cl
	}, {
		x: 0,
		y: 3 * cl
	}],
	width: 1.5 * cl,
	height: 4.5 * cl,
	top: 1.5 * cl,
	left: 4.5 * cl,
	color: "#fa8ccc"
}, {
	p: [{
		x: 3 * cl,
		y: 0
	}, {
		x: 6 * cl,
		y: 3 * cl
	}, {
		x: 0,
		y: 3 * cl
	}],
	width: 6 * cl,
	height: 3 * cl,
	top: 3 * cl,
	left: 0,
	color: "#f6ca29"
}];

function drawAgain(ctxt, piece, w, h, url) {
	var newImage = new Image();
	newImage.src = url;
	console.log("开始生成");
	newImage.onload = function() {
		console.log("新图片生成完毕");
		var i_w = newImage.width;
		var i_h = newImage.height;
		ctxt.clearRect(0, 0, w, h);//清除画板的内容
		ctxt.beginPath(); //开始路径
		ctxt.moveTo(piece.p[0].x, piece.p[0].y); //canvas画笔移动到目标点
		for(var i = 1; i < piece.p.length; i++) {
			ctxt.lineTo(piece.p[i].x, piece.p[i].y); //canvas画笔依次绘制路径点
		};
		ctxt.closePath(); //闭合路径
		//ctxt.fillStyle = piece.color; //填充颜色
		//ctxt.stroke();//绘制描边路径
		//ctxt.strokeStyle = "#fff";
		//ctxt.fill(); //图形的填充
		ctxt.clip();
		if((i_w / i_h) <= (w / h)) {
			console.log("A类图,宽较小");
			ctxt.drawImage(newImage, 0, 0, i_w, i_w * h / w, 0, 0, w, h);
		} else {
			console.log("B类图,宽较大");
			ctxt.drawImage(newImage, 0, 0, i_h * w / h, i_h, 0, 0, w, h);
		}
		console.log(w + '--' + h);
	}
}

//base64压缩，写成回调形式
function base64(file, callbackFn) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		var data = e.target.result;
		if(callbackFn) {
			console.log("base64编码完成");
			callbackFn(data);
		}
	}
}

function drawFirst(ctxt, piece) {
	ctxt.beginPath(); //开始路径
	ctxt.moveTo(piece.p[0].x, piece.p[0].y); //canvas画笔移动到目标点
	for(var i = 1; i < piece.p.length; i++) {
		ctxt.lineTo(piece.p[i].x, piece.p[i].y); //canvas画笔依次绘制路径点
	};
	ctxt.closePath(); //闭合路径
	ctxt.fillStyle = piece.color; //填充颜色
	ctxt.stroke();//绘制描边路径
	ctxt.fill(); //图形的填充
}

function saveHtml2Image(obj,callbackFn) {
	var width = obj.width();
	var height = obj.height();
	console.log(width+'--'+height);
	html2canvas(obj, {
		width: width,
		height: height,
		background: "rgba(255,255,255,1)",
		onrendered: function(canvas) {
            var dataUrl = canvas.toDataURL('image/jpeg');
            callbackFn(dataUrl);//写成回调的形式
		}
	});
}

$(document).ready(function() {
	for(var i = 0; i < tangram.length; i++) {
		$('<canvas id ="canvas_' + i + '"></canvas>').appendTo($("#canvas_area"));
		var canvas = $("#canvas_" + i)[0];
		canvas.width = tangram[i].width;
		canvas.height = tangram[i].height;
		canvas.style.left = tangram[i].left + 'px';
		canvas.style.top = tangram[i].top + 'px';
		var context = canvas.getContext("2d"); //获取绘图上下文环境
		drawFirst(context, tangram[i]);
	};

	$('button[class^="upload_btn_"]').each(function(i,ele){
		$(this).css({"background-color":tangram[i]["color"]});//tangram[i].color可以,tangram[i][color]会出错
	});

	$('button[class^="upload_btn_"]>input').each(function(i,ele){
		$(this).change(function(){
			var _this = this;
			base64(_this.files[0], function(base64) {
				var canvas = $("#canvas_"+i)[0];
				var context = canvas.getContext("2d"); //获取绘图上下文环境
				drawAgain(context, tangram[i], canvas.width, canvas.height, base64);
			});
		})
	});
	
	$("#input_all").change(function(){
		var _this = this;
		for(var i = 0;i<_this.files.length;i++){
			!function(i){
				base64(_this.files[i], function(base64) {
					console.warn("第"+i+"张图");
					var canvas = $("#canvas_"+i)[0];
					var context = canvas.getContext("2d"); //获取绘图上下文环境
					drawAgain(context, tangram[i], canvas.width, canvas.height, base64);
				});
			}(i);
			//把i的值传入function,不能保证操作的先后，对于一些执行事件较长的命令，最后i可能会变化
		}
	});
	
	$("#creat_img").click(function(e) {
		e.preventDefault();
		$("body,html").animate({scrollTop: 0}, 0);//必须把页面滚动到最顶部，不然截图会不完整
		saveHtml2Image($("#canvas_area"),function(data){
			var img = new Image();
            $(img).attr("src",data);
            img.onload = function(){
            	$("#mask_area").html("").append($(img)).append($("<p>恭喜，生成新图片啦!</p>")).slideDown();
            	$("#downloadImage").show().attr({
            		"href":data,
            		"download":"ceshi"+new Date().getTime()+".jpg"
            	});
            }
		});
	});
	
	$("#mask_area").click(function(){
		console.log("mask关闭");
		$(this).hide();//this.hide()是错误的写法,this是js对象,$(this)是jq对象
	});
	
	$("#creat_qr").click(function(e){
		//生成table类型的二维码时,为render:"table"
		e.preventDefault();
		$("#mask_area").html("").slideDown();
		jQuery('#mask_area').qrcode({
			render: "canvas",
			width:6*cl,
			height:6*cl,
			text: window.location.href,
//			background : "#ffffff",       //二维码的后景色  
//          foreground : "#000000",        //二维码的前景色  
//          src: 'img/lbxx.jpg'
		});
	})
	
});