import StreamEventEnum from './enum/stream-event.enum';

const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

interface OffscreenMessage<T = unknown> {
  type: string;
  target?: 'offscreen';
  data?: T;
}

async function hasOffscreenDocument(): Promise<boolean> {
  // eslint-disable-next-line no-restricted-globals
  const matchedClients = await (self as unknown as ServiceWorkerGlobalScope).clients.matchAll();
  return matchedClients.some(client => client.url.endsWith(OFFSCREEN_DOCUMENT_PATH));
}

async function sendMessageToOffscreen<T>(type: string, data?: T): Promise<void> {
  try {
    if (!(await hasOffscreenDocument())) {
      await chrome.offscreen.createDocument({
        url: OFFSCREEN_DOCUMENT_PATH,
        reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
        justification: 'Manipulation and playback of audio for the user',
      });
    }
    chrome.runtime.sendMessage<OffscreenMessage<T>>({
      type,
      target: 'offscreen',
      data,
    });
  } catch (error) {
    console.error(`Error sending message to offscreen: ${error}`);
  }
}

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

const requestVoicesFromOffscreen = async (): Promise<void> => {
  await sendMessageToOffscreen('REQUEST_VOICES_FROM_OFFSCREEN');
};

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'VOICES_FROM_OFFSCREEN') {
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'AVAILABLE_VOICES',
            payload: message.payload,
          });
        }
      });
    });
  }

  if (message.type === 'REQUEST_VOICES') {
    requestVoicesFromOffscreen();
  }
});
