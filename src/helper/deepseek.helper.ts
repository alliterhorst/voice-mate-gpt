import AudioStatusEnum from '../enum/audio-status.enum';
import AbstractChatHelper from './abstract-chat.helper';

const PROMPT_SELECTOR = '#chat-input';

class DeepseekTHelper extends AbstractChatHelper {
  readonly hasNativeTextToSpeech: boolean = false;

  private audioElement: HTMLAudioElement | null = null;

  constructor() {
    super();
    this.init();
  }

  private loadPromptElement(): void {
    this.promptElement = document.querySelector(PROMPT_SELECTOR);
  }

  private loadSendButtonElement(): void {
    this.sendButtonElement = document.querySelector(
      'input[type="file"][multiple][style="display: none;"] + div[role="button"]',
    );
  }

  private loadMessageGroupElement(): void {
    this.messageGroupElement = document.querySelector(
      '#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > div > div',
    );
  }

  private init(): void {
    console.log('DeepseekTHelper init', this);
    this.loadPromptElement();
    this.loadSendButtonElement();
    this.loadMessageGroupElement();
    this.loadLastMessageElement();
  }

  private loadLastMessageElement(): void {
    this.lastMessageElement = document.querySelector(
      '#root > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div:last-child',
    );
  }

  getPromptElement(): HTMLElement | null {
    this.loadPromptElement();
    return this.promptElement;
  }

  updatePrompt(text: string): void {
    this.loadPromptElement();
    console.log('DeepseekTHelper updatePrompt', this.promptElement);
    if (!this.promptElement) {
      this.promptElement = document.querySelector(PROMPT_SELECTOR);
      if (!this.promptElement) throw new Error('Prompt element not found');
    }

    const promptInput = this.promptElement as HTMLInputElement;

    const existingText = promptInput.value;
    const fullText = existingText ? `${existingText} ${text}` : text;

    promptInput.value = fullText;
    promptInput.focus();

    const event = new Event('input', { bubbles: true });
    promptInput.dispatchEvent(event);
  }

  sendMessage(): void {
    const attemptToSendMessage = (retryCount: number): void => {
      this.loadSendButtonElement();
      console.log('DeepseekTHelper sendMessage', this.sendButtonElement);

      let clickDispatched = false;

      const clickListener = (): void => {
        console.log('Send button click event successfully dispatched');
        clickDispatched = true;
        this.sendButtonElement?.removeEventListener('click', clickListener);
      };

      this.sendButtonElement?.addEventListener('click', clickListener);

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      this.sendButtonElement?.dispatchEvent(clickEvent);

      setTimeout(() => {
        if (!clickDispatched && retryCount > 0) {
          console.log(
            `Click event not dispatched successfully. Retrying... (${retryCount} attempts left)`,
          );
          this.sendButtonElement?.removeEventListener('click', clickListener);
          attemptToSendMessage(retryCount - 1);
        } else if (!clickDispatched) {
          console.error('Send button click event not dispatched after multiple attempts');
        }
      }, 500);

      this.rollDown();
    };
    setTimeout(() => {
      attemptToSendMessage(5);
    }, 500);
  }

  clearPrompt(): void {
    this.loadPromptElement();
    console.log('DeepseekTHelper clearPrompt', this.promptElement);

    if (!this.promptElement) throw new Error('Prompt element not found');

    const promptInput = this.promptElement as HTMLInputElement;

    if (!promptInput.value) return;

    promptInput.value = '';
    promptInput.focus();

    const event = new Event('input', { bubbles: true });
    promptInput.dispatchEvent(event);
  }

  rollDown(): void {
    console.log('DeepseekTHelper rollDown, not implemented', this.scrollBottomElement);
  }

  changePathURL(currentPath: string): void {
    console.log('DeepseekTHelper changePathURL', currentPath);
    this.init();
  }

  whenHydrationCompleted(callback: () => void): void {
    if (this.getPromptElement()) {
      callback();
      return;
    }
    const observer = new MutationObserver((mutations, obs) => {
      const hydrationCompleted = mutations.some(
        mutation => mutation.type === 'childList' && this.getPromptElement(),
      );
      if (hydrationCompleted) {
        obs.disconnect();
        callback();
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  stopAudio(): void {
    console.log('DeepseekTHelper stopAudio', this.audioElement);
  }

  observeAudioPlayback(onChangeAudioStatus: (audioStatus: AudioStatusEnum) => void): void {
    console.log('DeepseekTHelper observeAudioPlayback', this.audioElement, onChangeAudioStatus);
  }
}

export default DeepseekTHelper;
