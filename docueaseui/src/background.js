// background.js or popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getCurrentTabUrl") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            sendResponse({ url: tabs[0].url });
        });
        return true; // Indicate asynchronous response
    }
});
