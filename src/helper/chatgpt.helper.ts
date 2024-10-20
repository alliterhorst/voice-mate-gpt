import AudioStatusEnum from '../enum/audio-status.enum';
import AbstractChatHelper from './abstract-chat.helper';

class ChatGPTHelper extends AbstractChatHelper {
  readonly hasNativeTextToSpeech: boolean = true;

  private lastButtonTextToSpeechPlay: HTMLButtonElement | null = null;

  private audioElement: HTMLAudioElement | null = null;

  constructor() {
    super();
    this.init();
  }

  private loadPromptElement(): void {
    this.promptElement = document.querySelector('#prompt-textarea');
  }

  private loadSendButtonElement(): void {
    this.sendButtonElement = document.querySelector('button[data-testid="send-button"]');
  }

  private loadMessageGroupElement(): void {
    this.messageGroupElement = document.querySelector('[role="presentation"]')?.children[0]
      ?.children[0]?.children[0]?.children[0] as HTMLElement;
  }

  private init(): void {
    console.log('ChatGPTHelper init', this);
    this.loadPromptElement();
    this.loadSendButtonElement();
    this.loadMessageGroupElement();
    this.loadScrollBottomElement();
    this.loadLastMessageElement();
    this.loadLastButtonTextToSpeechPlay();
    this.loadAudioElement();
  }

  private loadScrollBottomElement(): void {
    if (this.messageGroupElement?.lastChild) {
      const lastChild = this.messageGroupElement.lastChild as HTMLElement;
      if (lastChild.tagName === 'BUTTON') {
        this.scrollBottomElement = lastChild;
      }
    }
  }

  private loadLastMessageElement(): void {
    this.lastMessageElement = document.querySelector('[data-scroll-anchor="true"]');
  }

  private loadLastButtonTextToSpeechPlay(): void {
    this.loadLastMessageElement();
    this.lastButtonTextToSpeechPlay = this.lastMessageElement?.querySelector(
      'button[data-testid="voice-play-turn-action-button"]',
    ) as HTMLButtonElement;
  }

  private loadAudioElement(): void {
    this.audioElement = document.querySelector('audio');
  }

  private enableSendButton(): void {
    this.loadSendButtonElement();
    if (!this.sendButtonElement) throw new Error('Send button element not found');
    this.sendButtonElement.removeAttribute('disabled');
    this.sendButtonElement.classList.remove('disabled');
  }

  getPromptElement(): HTMLElement | null {
    this.loadPromptElement();
    return this.promptElement;
  }

  updatePrompt(text: string): void {
    this.loadPromptElement();
    console.log('ChatGPTHelper updatePrompt', this.promptElement);
    if (!this.promptElement) {
      this.promptElement = document.querySelector('#prompt-textarea');
      if (!this.promptElement) throw new Error('Prompt element not found');
    }

    const promptDiv = this.promptElement as HTMLElement;
    const existingText = promptDiv.innerText;
    const fullText = existingText ? `${existingText} ${text}` : text;

    promptDiv.focus();
    promptDiv.innerText = fullText;

    const event = new Event('input', { bubbles: true });
    promptDiv.dispatchEvent(event);
  }

  sendMessage(): void {
    const attemptToSendMessage = (retryCount: number): void => {
      this.loadSendButtonElement();
      console.log('ChatGPTHelper sendMessage', this.sendButtonElement);

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
    console.log('ChatGPTHelper clearPrompt', this.promptElement);
    if (!this.promptElement) throw new Error('Prompt element not found');

    const promptDiv = this.promptElement as HTMLElement;

    if (!promptDiv.innerText) return;

    promptDiv.focus();
    promptDiv.innerText = '';

    const event = new Event('input', { bubbles: true });
    promptDiv.dispatchEvent(event);
  }

  rollDown(): void {
    console.log('ChatGPTHelper rollDown', this.promptElement);
    this.loadScrollBottomElement();
    this.scrollBottomElement?.click();
  }

  changePathURL(currentPath: string): void {
    console.log('ChatGPTHelper changePathURL', currentPath);
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

  playNativeTextToSpeech(): void {
    const attemptToPlayTTS = (retryCount: number): void => {
      this.loadLastButtonTextToSpeechPlay();
      console.log('ChatGPTHelper playNativeTextToSpeech', this.lastButtonTextToSpeechPlay);

      if (!this.lastButtonTextToSpeechPlay) {
        if (retryCount > 0) {
          console.log(`Text-to-Speech button not found. Retrying... (${retryCount} attempts left)`);
          setTimeout(() => attemptToPlayTTS(retryCount - 1), 500);
        } else {
          console.error('Text-to-Speech button not found after multiple attempts');
        }
        return;
      }

      this.lastButtonTextToSpeechPlay.click();
    };
    setTimeout(() => attemptToPlayTTS(5), 500);
  }

  observeAudioPlayback(onChangeAudioStatus: (audioStatus: AudioStatusEnum) => void): void {
    this.loadAudioElement();
    if (!this.audioElement) {
      console.error('Audio element not found');
      return;
    }
    this.audioElement.addEventListener('play', () => onChangeAudioStatus(AudioStatusEnum.PLAYING));
    this.audioElement.addEventListener('ended', () => onChangeAudioStatus(AudioStatusEnum.STOPPED));
    this.audioElement.addEventListener('pause', () => onChangeAudioStatus(AudioStatusEnum.STOPPED));

    if (!this.audioElement.paused && !this.audioElement.ended) {
      onChangeAudioStatus(AudioStatusEnum.PLAYING);
    }
  }
}

export default ChatGPTHelper;
