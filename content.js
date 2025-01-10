// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        const pageContent = document.body.innerText;
        sendResponse({ content: pageContent });
    }
});
