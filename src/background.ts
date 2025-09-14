/// <reference types="chrome" />

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed")
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "loadIdeas") {
        chrome.storage.local.get("ideas", (result) => {
            sendResponse({ data: result.ideas || [] })
        })
        return true
    }

    if (message.type === "saveIdeas") {
        chrome.storage.local.set({ ideas: message.data }, () => {
            sendResponse({ success: true })
        })
        return true
    }
})