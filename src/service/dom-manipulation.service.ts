import { loadConfigurations, setConfigurations } from '../common/utils.common';
import AudioStatusEnum from '../enum/audio-status.enum';
import DOMManipulationEventEnum from '../enum/dom-manipulation-event.enum';
import DOMStatusEnum from '../enum/dom-status.enum';
import HostnameEnum from '../enum/hostname.enum';
import StreamEventEnum from '../enum/stream-event.enum';
import AbstractChatHelper from '../helper/abstract-chat.helper';
import ChatGPTHelper from '../helper/chatgpt.helper';
import DeepseekTHelper from '../helper/deepseek.helper';
import ConfigurationInterface from '../interface/configuration.interface';
import ListenerService from './listener.service';

class DOMManipulationService extends ListenerService<
  DOMManipulationService,
  DOMManipulationEventEnum
> {
  private chatHelper: AbstractChatHelper | null;

  private currentHost: string;

  private currentPath: string;

  public status: DOMStatusEnum = DOMStatusEnum.LOADING;

  public config: ConfigurationInterface | null;

  public voicesAvailable: SpeechSynthesisVoice[] = [];

  private isTextToSpeechEnabled: boolean;

  private hasPluginBeenStarted: boolean = false;

  constructor() {
    super();
    this.chatHelper = null;
    this.currentHost = window.location.host;
    this.currentPath = window.location.pathname;
    this.config = null;
    this.isTextToSpeechEnabled = false;
    this.init();
  }

  private init(): void {
    switch (this.currentHost) {
      case HostnameEnum.CHATGPT:
      case HostnameEnum.PAGE_TEST_GPT:
        this.chatHelper = new ChatGPTHelper();
        break;
      case HostnameEnum.DEEPSEEK:
        this.chatHelper = new DeepseekTHelper();
        break;
      default:
        break;
    }
    console.log('DOMManipulationService init', this.chatHelper);

    this.getVoicesAvailable();
    this.observeBackgroundMessages();
    this.observePathChanges();
    this.observeAudioPlayback();
  }

  updatePrompt(text: string): void {
    console.log('DOMManipulationService updatePrompt', text);
    this.chatHelper?.updatePrompt(text);
    this.notifyListeners(DOMManipulationEventEnum.UPDATED_PROMPT);
    if (this.config?.automaticallySendMessage) this.sendMessage();
  }

  sendMessage(): void {
    console.log('DOMManipulationService sendMessage');
    this.chatHelper?.sendMessage();
    this.notifyListeners(DOMManipulationEventEnum.MESSAGE_SENT);
  }

  clearPrompt(): void {
    console.log('DOMManipulationService clearPrompt');
    this.chatHelper?.clearPrompt();
    this.notifyListeners(DOMManipulationEventEnum.CLEAN_PROMPT);
  }

  rollDown(): void {
    console.log('DOMManipulationService rollDown');
    this.chatHelper?.rollDown();
    this.notifyListeners(DOMManipulationEventEnum.ROLLED_DOWN);
  }

  whenHydrationCompleted(callback: () => void): void {
    loadConfigurations().then(config => {
      this.config = config;
      if (this.chatHelper) this.chatHelper.whenHydrationCompleted(callback);
    });
  }

  updateConfig(config: ConfigurationInterface): void {
    console.log('DOMManipulationService configUpdated');
    setConfigurations(config);
    this.config = config;
    this.notifyListeners(DOMManipulationEventEnum.CONFIG_UPDATED);
  }

  getVoicesAvailable(): void {
    console.log('DOMManipulationService getVoicesAvailable');
    chrome.runtime.onMessage.addListener((message: { type: string; payload?: unknown }) => {
      if (message.type === 'AVAILABLE_VOICES' && Array.isArray(message.payload)) {
        this.voicesAvailable = message.payload as SpeechSynthesisVoice[];
        setTimeout(() => {
          this.notifyListeners(DOMManipulationEventEnum.VOICES_AVAILABLE);
        }, 1000);
      }
    });
    chrome.runtime.sendMessage({ type: 'REQUEST_VOICES' });
  }

  updateTextToSpeech(isEnable: boolean): void {
    console.log(
      'DOMManipulationService configUpdated',
      isEnable,
      'Old',
      this.isTextToSpeechEnabled,
    );
    if (this.isTextToSpeechEnabled === isEnable) return;
    this.isTextToSpeechEnabled = isEnable;
    this.notifyListeners(DOMManipulationEventEnum.TEXT_TO_SPEECH_UPDATED);
    if (!isEnable) this.skipMessage();
  }

  skipMessage(): void {
    console.log('DOMManipulationService - skipMessage');
    this.chatHelper?.stopAudio();
    this.notifyListeners(DOMManipulationEventEnum.MESSAGE_SKIPPED);
  }

  startPlugin(): void {
    this.hasPluginBeenStarted = true;
    this.notifyListeners(DOMManipulationEventEnum.PLUGIN_STARTED);
  }

  private streamStarted(): void {
    console.log('Stream started');
    this.notifyListeners(DOMManipulationEventEnum.STREAM_STARTED);
  }

  private streamCompleted(): void {
    console.log('Stream completed');
    if (
      this.chatHelper?.hasNativeTextToSpeech &&
      this.hasPluginBeenStarted &&
      this.isTextToSpeechEnabled
    )
      this.chatHelper.playNativeTextToSpeech();
    this.notifyListeners(DOMManipulationEventEnum.STREAM_COMPLETED);
  }

  private observeBackgroundMessages(): void {
    chrome?.runtime?.onMessage?.addListener(message => {
      switch (message.type) {
        case StreamEventEnum.STREAM_STARTED:
          this.streamStarted();
          break;
        case StreamEventEnum.STREAM_COMPLETED:
          this.streamCompleted();
          break;
        default:
          break;
      }
    });
  }

  private observeAudioPlayback(): void {
    this.chatHelper?.observeAudioPlayback((audioStatus: AudioStatusEnum) => {
      switch (audioStatus) {
        case AudioStatusEnum.PLAYING:
          this.notifyListeners(DOMManipulationEventEnum.AUDIO_PLAYING);
          break;
        case AudioStatusEnum.STOPPED:
          this.notifyListeners(DOMManipulationEventEnum.AUDIO_STOPPED);
          break;
        default:
          break;
      }
    });
  }

  private observePathChanges(): void {
    const handleUrlChange = (): void => {
      const newPath = window.location.pathname;
      if (this.currentPath !== newPath) {
        console.log(`Path changed from ${this.currentPath} to ${newPath}`);
        this.currentPath = newPath;
        this.chatHelper?.changePathURL(newPath);
      }
    };

    window.addEventListener('popstate', handleUrlChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function pushState(
      state: unknown,
      title: string,
      url?: string | URL | null | undefined,
    ): void {
      originalPushState.apply(window.history, [state, title, url]);
      handleUrlChange();
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function replaceState(
      state: unknown,
      title: string,
      url?: string | URL | null | undefined,
    ): void {
      originalReplaceState.apply(window.history, [state, title, url]);
      handleUrlChange();
    };

    handleUrlChange();
  }
}

export default DOMManipulationService;
