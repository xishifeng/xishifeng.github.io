'use strict';
var _meta = document.createElement('meta');
_meta.name = 'viewport';
_meta.content = 'width=device-width,initial-scale=' + (window.screen.width / 750) + ',maximum-scale=2.0,user-scalable=0';
insertAfter(_meta, document.querySelector('title'));

var _weekly_data = JSON.parse(decodeURIComponent(getUrlParam('weekly_data')));
console.log(_weekly_data);

Vue.component('simple-counter', {
	props: ['data'],
	template: '#myComponent',
	data: function() {
		return {};
	}
});

var vm = new Vue({
	el: '#app',
	created: function() {
		var _this = this;
		$.ajax({
			type: "get",
			url: "js/sl.json",
			async: true,
			success: function(data) {
				console.log(data);
				_this.$data.listMain = data.data;
				console.log(_this.$data.listMain);
			}
		});
	},
	data: {
		seen: true,
		_weekly_data: JSON.parse(decodeURIComponent(getUrlParam('weekly_data'))),
		listMain :[]
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