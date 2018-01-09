var _imgs = document.querySelectorAll('img');
_imgs.forEach(function(v, i){
	console.log(v +'==>'+ i);
	v.style.display = 'none';
});

var _obj = document.querySelectorAll('*');
_obj.forEach(function(v, i){
	v.style.backgroundImage = 'none';
});

console.log('no pic model start');
