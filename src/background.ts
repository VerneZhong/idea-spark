/// <reference types="chrome" />

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed")
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    console.log("Received message:", message)

    if (message.type === "saveIdeas") {
        chrome.storage.local.set({ ideas: message.data }, () => {
            console.log("Ideas saved:", message.data)
            sendResponse({ success: true })
        })
        return true // 让 sendResponse 异步可用
    }

    if (message.type === "loadIdeas") {
        chrome.storage.local.get("ideas", (result) => {
            const ideas = result.ideas || []
            console.log("Ideas loaded:", ideas)
            sendResponse({ success: true, data: ideas })
        })
        return true
    }
})