import AudioStatusEnum from '../enum/audio-status.enum';

abstract class AbstractChatHelper {
  protected promptElement: HTMLElement | null;

  protected sendButtonElement: HTMLElement | null;

  protected messageGroupElement: HTMLElement | null;

  protected scrollBottomElement: HTMLElement | null;

  protected lastMessageElement: HTMLElement | null;

  readonly hasNativeTextToSpeech: boolean = false;

  constructor() {
    this.promptElement = null;
    this.sendButtonElement = null;
    this.messageGroupElement = null;
    this.scrollBottomElement = null;
    this.lastMessageElement = null;
  }

  getPromptElement(): HTMLElement | null {
    return this.promptElement;
  }

  getSendButtonElement(): HTMLElement | null {
    return this.sendButtonElement;
  }

  getMessageGroupElement(): HTMLElement | null {
    return this.messageGroupElement;
  }

  getScrollBottomElement(): HTMLElement | null {
    return this.scrollBottomElement;
  }

  getLastMessageElement(): HTMLElement | null {
    return this.lastMessageElement;
  }

  playNativeTextToSpeech(): void {
    console.log('playNativeTextToSpeech - hasNativeTextToSpeech:', this.hasNativeTextToSpeech);
  }

  abstract whenHydrationCompleted(callback: () => void): void;
  abstract observeAudioPlayback(onChangeAudioStatus: (audioStatus: AudioStatusEnum) => void): void;
  abstract stopAudio(): void;

  abstract clearPrompt(): void;
  abstract updatePrompt(text: string): void;
  abstract sendMessage(): void;
  abstract rollDown(): void;
  abstract changePathURL(currentPath: string, oldPath?: string): void;
}

export default AbstractChatHelper;
