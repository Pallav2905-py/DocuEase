console.log('Background worker running');

// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getScrapedText") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getScrapedText" }, (response) => {
          sendResponse({ text: response.text });
        });
      });
      return true; // Required to use sendResponse asynchronously
    }
  });
  