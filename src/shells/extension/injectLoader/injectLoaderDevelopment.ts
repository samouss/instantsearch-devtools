import { LOADER_NAMESPACE } from '../../../constants';

const scriptAsync = document.createElement('script');
scriptAsync.src = chrome.extension.getURL('inject.js');
scriptAsync.onload = () => {
  window.postMessage({ source: LOADER_NAMESPACE }, '*');
  scriptAsync.remove();
};
document.documentElement.appendChild(scriptAsync);
