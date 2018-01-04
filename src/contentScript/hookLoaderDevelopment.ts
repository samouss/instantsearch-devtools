const scriptAsync = document.createElement('script');
scriptAsync.src = chrome.extension.getURL('hook.js');
scriptAsync.onload = () => {
  window.postMessage({ source: 'chrome-devtools-experiments-loader' }, '*');
  scriptAsync.remove();
};
document.documentElement.appendChild(scriptAsync);
