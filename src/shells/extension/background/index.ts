import createChannelManager from './createChannelManager';

chrome.runtime.onConnect.addListener(createChannelManager());
