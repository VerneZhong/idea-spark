"use strict";
// 如果插件需要操作网页中的 DOM 或注入逻辑，可在此文件实现
console.log('DevSpark content script loaded');
// 示例：高亮页面中所有 <h1> 标签
const headers = document.querySelectorAll('h1');
headers.forEach(h => {
    h.style.backgroundColor = '#fffa9e';
});
