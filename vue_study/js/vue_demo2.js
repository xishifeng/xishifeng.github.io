'use strict';
var _meta = document.createElement('meta');
_meta.name = 'viewport';
_meta.content = 'width=device-width,initial-scale=' + (window.screen.width / 750) + ',maximum-scale=2.0,user-scalable=0';
insertAfter(_meta, document.querySelector('title'));

var _weekly_data = JSON.parse(decodeURIComponent(getUrlParam('weekly_data')));
console.log(_weekly_data);

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们却给每个组件实例返回了同一个对象的引用
  data: function () {
    return {};
  }
})

var vm = new Vue({
	el: '#app',
	data: {
		seen: true,
		_weekly_data: JSON.parse(decodeURIComponent(getUrlParam('weekly_data')))
	},
	created: function(){
		var _this = this;
		$.ajax({
			type:"get",
			url:"js/sl.json",
			async:true,
			success: function(data){
				console.log(data);
				_this.$data.listMain = data.data;
				console.log(_this.$data.listMain);
			}
		});
	},
	computed: {
		// 仅读取
		aDouble: function() {
			return this.a * 2
		},
		// 读取和设置
		aPlus: {
			get: function() {
				return this.a + 1
			},
			set: function(v) {
				this.a = v - 1
			}
		}
	}
});