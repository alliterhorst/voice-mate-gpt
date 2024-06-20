import AbstractChatHelper from '../helper/abstract-chat.helper';
import ChatGPTHelper from '../helper/chatgpt.helper';
import ListenerService from './listener.service';

enum DOMManipulationEventEnum {
  CLICK = 'CLICK',
  CHANGE = 'CHANGE',
  INPUT = 'INPUT',
  KEY_DOWN = 'KEYDOWN',
  KEY_UP = 'KEYUP',
  KEY_PRESS = 'KEYPRESS',
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
}

window.DOMManipulationService = new DOMManipulationService();
