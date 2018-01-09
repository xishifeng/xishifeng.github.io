console.log('xiuxiu_zhuru==');
$(document.body).append('<a id="zhuru_a" href="javascript:;" style="position: fixed;width: 2rem;height: 1rem;background-color: transparent;bottom: 0;left: 1rem;z-index: 10;font-size: 0.24rem;line-height: 1rem;text-align: center;">START</a>');

var _kaiFlag = true,_timer, _aObjZhuru = $('#zhuru_a');
$('img[src=\'image/but_xiuyixiu.png\']').click(function(e){
	e.preventDefault();
	e.stopPropagation();
	if(_kaiFlag){
		_kaiFlag = false;
		_aObjZhuru.html('STOP');
		_timer = setInterval(function(e){
			tijiao();
		},300);
	}else{
		_kaiFlag = true;
		clearInterval(_timer);
		_aObjZhuru.html('START');
	}
//	tijiao();tijiao();tijiao();tijiao();tijiao();
});


function tijiao(){
	$.ajax({
		type: 'POST',
		url: ServerHost + "/Newyear/participate",
		data: {
			"name": '习世锋',
			"type": 2,
			"phone": 13636508937,
			"url": location.href
		},
		success: function(){},
		dataType: "json"
	});
};