chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
//  if (info.type === 'other' || info.type === 'object' || info.type === 'media') {
//    chrome.tabs.sendMessage(info.tabId, {desc: JSON.stringify(info), url: info.url, format: 'mp3', type: 'music'});
//    console.log(info);
//  }
    if (info.type === 'image') {
//    chrome.tabs.sendMessage(info.tabId, {desc: JSON.stringify(info), url: info.url, format: 'mp3', type: 'music'});
      console.log(info['url']);
    }
  },
  // filters
  {
    urls: [
      "*://*/*"
    ]
  }
);