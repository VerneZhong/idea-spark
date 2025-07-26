// 用于监听扩展事件或与 content/popup 通信
chrome.runtime.onInstalled.addListener(() => {
    console.log('DevSpark 插件已安装');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PING') {
        sendResponse({ type: 'PONG', message: 'Hello from background!' });
    }
});