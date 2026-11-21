function updateBadge(enabled) 
{
  chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
  chrome.action.setBadgeBackgroundColor({ color: enabled ? "#2e7d32" : "#757575" });
}

chrome.action.onClicked.addListener(async () => 
{
  const { enabled = true } = await chrome.storage.local.get("enabled");
  await chrome.storage.local.set({ enabled: !enabled });
  updateBadge(!enabled);
});

async function restoreBadge() 
{
  const { enabled = true } = await chrome.storage.local.get("enabled");
  updateBadge(enabled);
}
chrome.runtime.onStartup.addListener(restoreBadge);
chrome.runtime.onInstalled.addListener(restoreBadge);