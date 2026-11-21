let enabled = true;

function apply() 
{
  document.documentElement.classList.toggle("no-shorts", enabled);
  if (enabled) redirectShorts();
}

function redirectShorts() 
{
  const match = location.pathname.match(/^\/shorts\/([\w-]+)/);
  if (match) 
    {
        location.replace(`/watch?v=${match[1]}`);
    }
}

chrome.storage.local.get({ enabled: true }).then((data) => {
  enabled = data.enabled;
  apply();
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) 
    {
        enabled = changes.enabled.newValue;
        apply();
    }
});

window.addEventListener("yt-navigate-start", () => {
  if (enabled) redirectShorts();
});

window.addEventListener("yt-navigate-finish", () => {
  if (enabled) redirectShorts();
});

window.addEventListener("popstate", () => {
  if (enabled) redirectShorts();
});