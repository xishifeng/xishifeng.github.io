console.log('xiuxiu_zhuru==');
console.log($);
$('img[src=\'image/but_xiuyixiu.png\']').removeClass('but_xiuyixiu').click(function(e){
	e.preventDefault();
	e.stopPropagation();
	tijiao();tijiao();tijiao();tijiao();tijiao();
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

//wew