import StreamEventEnum from './enum/stream-event.enum';

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    const contentTypeHeader = details.responseHeaders?.find(
      header => header.name.toLowerCase() === 'content-type',
    );

    if (contentTypeHeader?.value?.includes('text/event-stream')) {
      console.log('Stream response started:', details.url);

      chrome.tabs.sendMessage(details.tabId, {
        type: StreamEventEnum.STREAM_STARTED,
        url: details.url,
      });
    }
  },
  {
    urls: ['*://chatgpt.com/backend-api/conversation'],
  },
  ['responseHeaders', 'extraHeaders'],
);

chrome.webRequest.onCompleted.addListener(
  details => {
    if (details.url.includes('/backend-api/conversation')) {
      console.log('Stream response completed for:', details.url);

      chrome.tabs.sendMessage(details.tabId, {
        type: StreamEventEnum.STREAM_COMPLETED,
        url: details.url,
      });
    }
  },
  {
    urls: ['*://chatgpt.com/backend-api/conversation'],
  },
);
