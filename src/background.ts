// 用于监听扩展事件或与 content/popup 通信
/// <reference types="chrome" />
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    console.log('Received message:', message)
    sendResponse({ ok: true })
});