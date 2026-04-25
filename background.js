let lastSourceTab = null;

// Listen: someone clicked button → open new tab
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "openImage") {
    // Save the tab from where the message came
    lastSourceTab = sender.tab.id;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let currentTabIndex = tabs[0].index;

      chrome.tabs.create({
        url: msg.url,
        index: currentTabIndex + 1
      });
    });
  }
});

// Detect when any tab closes
chrome.tabs.onRemoved.addListener((closedTabId) => {
  // If the closed tab was NOT the source tab → switch back to source tab
  if (lastSourceTab && closedTabId !== lastSourceTab) {
    chrome.tabs.get(lastSourceTab, (tab) => {
      if (chrome.runtime.lastError) return; // tab might not exist
      chrome.tabs.update(lastSourceTab, { active: true });
    });
  }
});
