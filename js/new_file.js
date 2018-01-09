// ==UserScript==
// @name              网易云音乐直接下载
// @namespace         https://www.ocrosoft.com/
// @description       在单曲页面显示歌词、翻译、封面、歌曲下载链接并以高音质试听。同时支持歌单、专辑、等页面直接下载单曲。脚本仍在测试，如遇到错误，请反馈网址。
// @match             *://music.163.com/*
// @grant             GM_xmlhttpRequest
// @version           2.3
// @license           GPLV2
// @connect           tts.baidu.com
// @compatible        Chrome
// @compatible        FireFox
// ==/UserScript==
/**
 * 修改自 https://greasyfork.org/zh-CN/scripts/10548
 * API 源码: https://github.com/Ocrosoft/NetEase_OutChain
 * 此脚本开源，API开源，所以请不要在未经允许的情况下在其他程序中调用此脚本中的API。
 **/

(function(root) {
	'use strict';
	/*
	 * @opentdoor 的跨域下载接口
	 */
	function Downloader() {
		// request
		function FileRequest(url, progress, callback) {
			var req = GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onprogress: function(res) {
					if(progress) progress(res);
				},
				overrideMimeType: 'text/plain;charset=x-user-defined',
				onreadystatechange: function(res) {
					if(res.readyState == 4) {
						if(res.status == 200) {
							var str = res.response;
							var ta1 = [];
							for(var i = 0; i < str.length; i++) {
								ta1[i] = str.charCodeAt(i) & 255;
							}
							var ua8 = new Uint8Array(ta1);
							var blob = new Blob([ua8]);
							callback(blob, res.status);
						} else {
							callback(null, res.status);
						}
					}
				}
			});
		} //save file

		function SaveFile(blob, filename) {
			if(root.navigator.msSaveBlob) {
				root.navigator.msSaveBlob(blob, filename);
			} else {
				var anchor = root.document.createElement('a');
				var url = root.URL.createObjectURL(blob);
				anchor.download = filename;
				anchor.href = url;
				var evt = root.document.createEvent('MouseEvents');
				evt.initEvent('click', true, true);
				anchor.dispatchEvent(evt);
				root.URL.revokeObjectURL(url);
			}
		} //interface

		function FileDownload(url, filename, downloading, success, error) {
			FileRequest(url, downloading, function(blob, status) {
				if(status == 200) {
					SaveFile(blob, filename);
					if(typeof success == 'function') success();
				} else {
					if(typeof error == 'function') error(status);
				}
			});
		}
		this.FileDownload = FileDownload;
		var anthorEvents = {
			onprogress: function(res) {
				if(this.anchor.getAttribute('data-res-action') == 'downloadDirect') {
					if(res.lengthComputable) {
						this.anchor.querySelector('i').innerText = '下载:' + (res.loaded * 100 / res.total).toFixed(2) + '%';
					} else {
						this.anchor.querySelector('i').innerText = '下载:' + anthorEvents.calcLength(res.loaded);
					}
				} else {
					if(res.lengthComputable) {
						this.anchor.innerText = '下载:' + (res.loaded * 100 / res.total).toFixed(2) + '%';
					} else {
						this.anchor.innerText = '下载:' + anthorEvents.calcLength(res.loaded);
					}
				}
			},
			calcLength: function(b) {
				b = Number(b) / 1024;
				if(b < 1024) {
					return b.toFixed(1) + 'KB';
				}
				b = b / 1024;
				if(b < 1024) {
					return b.toFixed(2) + 'MB';
				}
				b = b / 1024;
				return b.toFixed(3) + 'GB';
			},
			onsuccess: function() {
				this.anchor.innerHTML = this.Html;
				this.doing = false;
				if(this.anchor.id == 'tmp') {
					this.anchor.previousElementSibling.remove();
					this.anchor.remove();
				}
			},
			onerror: function() {
				this.anchor.innerHTML = '下载失败';
				this.handler = setTimeout(function(t) {
					t.anchor.innerHTML = t.Html;
					t.doing = false;
				}, 2000, this);
			},
			onAnthorClick: function(e) {
				e = e || event;
				var a = this.anchor;
				var ex = /([\w\s]+)(\.\w)(\?.*)?$/i.exec(a.href || '');
				var name = a.download || a.title;
				if(ex) {
					if(!name && ex.length > 1) name = ex[1];
					if(name && name.indexOf('.') == -1 && ex.length > 2) name += ex[2];
				}
				if(!name || !a.href) return;
				e.preventDefault();
				if(this.doing) return;
				this.doing = true;
				FileDownload(a.href, name, anthorEvents.onprogress.bind(this), anthorEvents.onsuccess.bind(this), anthorEvents.onerror.bind(this));
			}
		};
		//interface
		function BindAnthor(a) {
			var env = {
				Html: a.innerHTML,
				anchor: a
			};
			a.addEventListener('click', anthorEvents.onAnthorClick.bind(env), true);
		}
		this.BindAnthor = BindAnthor;
	}
	var downloader = new Downloader();
	var api = {
		detailUrl: function(songIds) {
			var tpl = (location.href.indexOf('https') == -1 ? 'http://music.ocrosoft.com/GetMusicLink.php?id=${songIds}' : 'https://www.ocrosoft.com/outchain/GetMusicLink.php?id=${songIds}');
			return tpl.replace('${songIds}', songIds.join(','));
		},
		detail: function(songIds, callback) {
			var script = document.createElement('script');
			var url = this.detailUrl(songIds) + '&callback=returnMusicData';
			//callback
			script.src = url;
			document.querySelector('iframe').contentWindow.document.querySelector('body').appendChild(script);
		},
		mediaUrl: function(songId) {
			return(location.href.indexOf('https') == -1 ? 'http' : 'https') + '://music.163.com/api/song/lyric?os=pc&id=' + songId + '&lv=-1&kv=-1&tv=-1';
		},
		media: function(songId, callback) {
			var req = new XMLHttpRequest();
			req.open('GET', this.mediaUrl(songId), true);
			req.onload = function() {
				callback(JSON.parse(this.responseText));
			};
			req.send();
		},
	};
	var innerFrame = document.querySelector('iframe');
	var tit,
		cov,
		dl;
	var fileName;
	var pages = [{
			url: 'http://music.163.com/#/song?id=',
			handler: function() {
				var innerFrameDoc = innerFrame.contentWindow.document;
				var albumNode = innerFrameDoc.querySelectorAll('p.des.s-fc4')[1];
				tit = innerFrameDoc.querySelector('.tit');
				cov = innerFrameDoc.querySelector('.u-cover').querySelector('img');
				dl = innerFrameDoc.querySelector('.u-btni-dl');
				fileName = tit.querySelector('.f-ff2').innerText + ' - ' + tit.parentNode.nextElementSibling.querySelector('.s-fc7').innerText + '.';
				var parentNode = albumNode.parentNode;
				var songId = location.href.match(/id=([0-9]+)/)[1];
				var downloadLine = this.createDownloadLine(songId);
				var script = document.createElement('script');
				script.innerHTML = 'var returnMusicData = function(data){ document.getElementById(\'wyyyydda\').src=data.mp3Url;}';
				innerFrameDoc.querySelector('body').appendChild(script);
				parentNode.insertBefore(downloadLine, albumNode.nextElementSibling);
			},
			createDownloadLine: function(songId) {
				var disableStyle = function(link) {
					link.text += '(无)';
					link.style.color = 'gray';
					link.style.textDecoration = 'none';
					link.style.cursor = 'auto';
				};
				var mp3Link = this.createMP3Link();
				var lyricLink = this.createLink('歌词');
				var tlyricLink = this.createLink('翻译');
				var coverLink = this.createLink('封面');
				var mp3Help = this.createLink('如何下载歌曲?');
				var showPlayer = this.createLink('高音质试听');
				mp3Help.addEventListener('click', function() {
					alert('点击下方的下载按钮之后等待即可。');
				});
				showPlayer.addEventListener('click', function() {
					var player = innerFrame.contentWindow.document.querySelector('#wyyyydda');
					player.setAttribute('controls', 'true');
					player.play();
				});
				lyricLink.setAttribute('download', fileName + 'lrc');
				tlyricLink.setAttribute('download', fileName.substring(0, fileName.length - 1) + '(翻译).lrc');
				coverLink.setAttribute('download', fileName + 'jpg');
				coverLink.href = cov.getAttribute('data-src');
				downloader.BindAnthor(coverLink);
				downloader.BindAnthor(dl);
				dl.href = 'javascript:;';
				dl.setAttribute('data-res-action', 'downloadDirect');
				dl.querySelector('i').innerText = '下载(稍候)';
				api.detail([songId], null);
				api.media(songId, function(result) {
					if(result.lrc && result.lrc.lyric) {
						lyricLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.lrc.lyric);
					} else {
						disableStyle(lyricLink);
					}
					if(result.tlyric && result.tlyric.lyric) {
						tlyricLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.tlyric.lyric);
					} else {
						disableStyle(tlyricLink);
					}
				});
				var container = this.createLineContainer('下载');
				container.appendChild(lyricLink); // 原文lrc
				container.appendChild(tlyricLink); // 翻译lrc
				container.appendChild(coverLink); // 封面
				container.appendChild(mp3Help); // 帮助
				container.appendChild(showPlayer); // 试听
				container.appendChild(document.createElement('br'));
				container.appendChild(mp3Link); // audio标签
				return container;
			},
			createLink: function(label) {
				var link = document.createElement('a');
				link.innerHTML = label;
				link.className = 's-fc7';
				link.style.marginRight = '10px';
				link.href = 'javascript:;';
				return link;
			},
			createMP3Link: function() {
				var link = document.createElement('audio');
				link.setAttribute('id', 'wyyyydda');
				link.style.marginTop = '10px';
				link.addEventListener('canplay', function() {
					dl.href = this.src;
					dl.setAttribute('download', fileName + 'mp3');
					dl.querySelector('i').innerText = '下载';
				});
				link.addEventListener('error', function() {
					prompt('无法加载此歌曲。可能此歌曲需要付费或版权受限。');
					dl.querySelector('i').innerText = '无法下载';
				});
				return link;
			},
			createLineContainer: function(label) {
				var container = document.createElement('p');
				container.className = 'desc s-fc4';
				container.innerHTML = label + '：';
				container.style.margin = '10px 0';
				return container;
			},
		},
		{
			url: [
				'http://music.163.com/#/playlist?id=', // 歌单
				'http://music.163.com/#/artist?id=', // 歌手
				'http://music.163.com/#/discover/toplist', // 榜单
				'http://music.163.com/#/album?id=', // 专辑
				'http://music.163.com/#/discover/recommend/taste' // 每日推荐
			],
			handler: function() {
				var innerFrameDoc = innerFrame.contentWindow.document;
				var downloadButtons = (innerFrameDoc).querySelectorAll('span.icn-dl');

				var script = document.createElement('script');
				script.innerHTML = 'var returnMusicData = function(data){ document.getElementById(\'wyyyydda\').src=data.mp3Url;}';
				innerFrameDoc.querySelector('body').appendChild(script);

				var audio = document.createElement('audio');
				//audio.setAttribute('src', res.mp3Url);
				audio.setAttribute('id', 'wyyyydda');
				audio.addEventListener('canplay', function() {
					var a = document.createElement('a');
					a.setAttribute('href', this.src);
					a.setAttribute('download', this.getAttribute('data-fileName') + '.mp3');
					a.setAttribute('id', 'tmp');
					downloader.BindAnthor(a);
					var _cele = innerFrameDoc.querySelector('[downloading]');
					_cele.parentNode.appendChild(document.createElement('br'));
					_cele.parentNode.appendChild(a);
					_cele.removeAttribute('downloading');
					a.click();
				});
				audio.addEventListener('error', function() {
					//var _id = this.getAttribute('data-res-id');
					alert('无法加载此歌曲。可能此歌曲需要付费或版权受限。');
				});
				innerFrameDoc.querySelector('body').appendChild(audio);

				this.replaceAction(innerFrameDoc, downloadButtons);
			},
			replaceAction: function(innerFrameDoc, downloadButtons) {
				for(var i = 0; i < downloadButtons.length; i++) {
					if(downloadButtons[i].getAttribute('data-res-action') == 'download') {
						downloadButtons[i].setAttribute('data-res-action', 'downloadDirect');
						downloadButtons[i].addEventListener('click', function() {
							var id = this.getAttribute('data-res-id');
							innerFrame.contentWindow.document.querySelector('#wyyyydda').setAttribute('data-fileName', this.previousElementSibling.getAttribute('data-res-name') + ' - ' + this.previousElementSibling.getAttribute('data-res-author'));
							innerFrame.contentWindow.document.querySelector('#wyyyydda').setAttribute('data-res-id', id);
							this.setAttribute('downloading', 'true');
							api.detail([id], null);
						});
					}
				}
			}
		},
	];

	function matchPagesURL(href, urls) {
		var ret = false;
		var t = location.href.split('://')[1];
		if(Array.isArray(urls)) {
			urls.forEach(function(ele) {
				if(t.indexOf(ele.split('://')[1]) === 0) {
					ret = true;
					return;
				}
			});
		} else {
			if(t.indexOf(urls.split('://')[1]) === 0) {
				ret = true;
			}
		}
		return ret;
	}
	if(innerFrame) {
		innerFrame.addEventListener('load', function() {
			var i,
				page;
			for(i = 0; i < pages.length; i += 1) {
				page = pages[i];
				if(matchPagesURL(location.href, page.url)) {
					page.handler();
				}
			}
		});
	}
})(window);