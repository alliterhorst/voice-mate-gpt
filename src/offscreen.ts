const mapVoices = (voice: SpeechSynthesisVoice): SpeechSynthesisVoice => ({
  name: voice.name,
  lang: voice.lang,
  default: voice.default,
  localService: voice.localService,
  voiceURI: voice.voiceURI,
});

const getAvailableVoices = async (): Promise<SpeechSynthesisVoice[]> =>
  new Promise(resolve => {
    const voices = window.speechSynthesis.getVoices().map(mapVoices);
    if (voices.length > 0) {
      resolve(voices);
    } else {
      speechSynthesis.onvoiceschanged = (): void => {
        resolve(window.speechSynthesis.getVoices().map(mapVoices));
      };
    }
  });

const initializeVoiceList = (): void => {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getAvailableVoices;
  } else {
    setTimeout(getAvailableVoices, 1000);
  }
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'REQUEST_VOICES_FROM_OFFSCREEN') {
    const voices = await getAvailableVoices();
    chrome.runtime.sendMessage({
      type: 'VOICES_FROM_OFFSCREEN',
      payload: voices,
    });
    sendResponse({ status: 'Voices fetched', data: voices });
    return true;
  }
  return false;
});

initializeVoiceList();
