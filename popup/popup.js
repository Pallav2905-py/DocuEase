document.getElementById("summarize").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => {
            if (response) {
                summarizeContent(response.content);
            }
        });
    });
});

async function summarizeContent(content) {
    const response = await fetch("YOUR_LLM_API_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content })
    });
    const summary = await response.json();
    document.getElementById("output").innerText = summary.result;
}


document.addEventListener("DOMContentLoaded", () => {
    const home = document.getElementById("home");
    const dashboard = document.getElementById("dashboard");
  
    document.getElementById("start").addEventListener("click", () => {
      home.style.display = "none";
      dashboard.style.display = "block";
    });
  
    document.getElementById("back").addEventListener("click", () => {
      dashboard.style.display = "none";
      home.style.display = "block";
    });
  });
  