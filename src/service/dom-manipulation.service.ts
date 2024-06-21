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

  constructor() {
    super();
    this.chatHelper = null;
    this.init();
  }

  private init(): void {
    this.chatHelper = new ChatGPTHelper();
    console.log('DOMManipulationService init', this.chatHelper);
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
}

window.DOMManipulationService = new DOMManipulationService();
