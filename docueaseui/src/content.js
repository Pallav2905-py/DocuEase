// src/content.js
const scrapePageContent = () => {
    const bodyContent = document.body.innerText;  // You can modify this to extract more specific content if needed
    return bodyContent;
  };
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
      const content = scrapePageContent();
      sendResponse(content);
    }
  });
  