import AbstractChatHelper from '../helper/abstract-chat.helper';
import ChatGPTHelper from '../helper/chatgpt.helper';
import ListenerService from './listener.service';

enum DOMManipulationEventEnum {
  MESSAGE_SENT = 'MESSAGE_SENT',
  UPDATED_PROMPT = 'UPDATED_PROMPT',
  CLEAN_PROMPT = 'CLEAN_PROMPT',
  ROLLED_DOWN = 'ROLLED_DOWN',
}

class DOMManipulationService extends ListenerService<
  DOMManipulationService,
  DOMManipulationEventEnum
> {
  private chatHelper: AbstractChatHelper | null;

  private currentPath: string;

  constructor() {
    super();
    this.chatHelper = null;
    this.currentPath = window.location.pathname;
    this.init();
  }

  private init(): void {
    this.chatHelper = new ChatGPTHelper();
    console.log('DOMManipulationService init', this.chatHelper);
    this.observePathChanges();
  }

  updatePrompt(text: string): void {
    console.log('DOMManipulationService updatePrompt', text);
    this.chatHelper?.updatePrompt(text);
    this.notifyListeners(DOMManipulationEventEnum.UPDATED_PROMPT);
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

window.DOMManipulationService = new DOMManipulationService();
