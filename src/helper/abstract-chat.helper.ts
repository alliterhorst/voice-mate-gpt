abstract class AbstractChatHelper {
  protected promptElement: HTMLElement | null;

  protected sendButtonElement: HTMLElement | null;

  protected messageGroupElement: HTMLElement | null;

  protected scrollBottomElement: HTMLElement | null;

  protected lastMessageElement: HTMLElement | null;

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

  abstract clearPrompt(): void;
  abstract updatePrompt(text: string): void;
  abstract sendMessage(): void;
  abstract rollDown(): void;
}

export default AbstractChatHelper;
