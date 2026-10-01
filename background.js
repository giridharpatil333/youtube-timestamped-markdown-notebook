// YouTube Timestamped Notebook Background Worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["ytNotes"], (res) => {
    if (!res.ytNotes) {
      chrome.storage.sync.set({ ytNotes: [] });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SAVE_NOTE") {
    chrome.storage.sync.get(["ytNotes"], (res) => {
      const notes = res.ytNotes || [];
      notes.unshift(request.note);
      chrome.storage.sync.set({ ytNotes: notes }, () => {
        sendResponse({ status: "SUCCESS" });
      });
    });
    return true;
  }
});
