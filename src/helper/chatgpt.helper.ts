/* eslint-disable class-methods-use-this */
import AbstractChatHelper from './abstract-chat.helper';

class ChatGPTHelper extends AbstractChatHelper {
  constructor() {
    super();
    this.init();
  }

  private init(): void {
    console.log('ChatGPTHelper init', this);
    this.promptElement = document.querySelector('#prompt-textarea');
    this.sendButtonElement = document.querySelector('button[data-testid="send-button"]');
    this.messageGroupElement = document.querySelector('[role="presentation"]')?.children[0]
      ?.children[0]?.children[0]?.children[0] as HTMLElement;
    this.updateScrollBottomElement();
    this.updateLastMessageElement();
  }

  private updateScrollBottomElement(): void {
    if (this.messageGroupElement?.lastChild) {
      const lastChild = this.messageGroupElement.lastChild as HTMLElement;
      if (lastChild.tagName === 'BUTTON') {
        this.scrollBottomElement = lastChild;
      }
    }
  }

  private updateLastMessageElement(): void {
    this.lastMessageElement = document.querySelector('[data-scroll-anchor="true"]');
  }

  private enableSendButton(): void {
    if (!this.sendButtonElement) throw new Error('Send button element not found');
    this.sendButtonElement.removeAttribute('disabled');
    this.sendButtonElement.classList.remove('disabled');
  }

  getPromptElement(): HTMLElement | null {
    return document.querySelector('#prompt-textarea');
  }

  updatePrompt(text: string): void {
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
    console.log('ChatGPTHelper sendMessage', this.promptElement);
    setTimeout(() => {
      (document.querySelector('button[data-testid="send-button"]') as HTMLButtonElement)?.click();
    }, 500);
    this.rollDown();
  }

  clearPrompt(): void {
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
    this.updateScrollBottomElement();
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
}

export default ChatGPTHelper;

/*
  -- mutation Test

  e = document.querySelector('[role="presentation"]')?.children[0]
      ?.children[0]?.children[0]?.children[0]
  c = { attributes: true, childList: true, subtree: true }
  m = new MutationObserver(e => console.log(e))
  m.observe(e, c)

  -- disconnect mutation
  m.disconnect()

  -- Ideias:
    * Monitorar novas mensagens
    * Monitorar fim da mensagem do GPT
    * Monitorar surgimento do botão de rolar para baixo
    * Monitorar surgimento dos botões de ler, copiar, gerar novamente, resposta insatisfatória e modelo de alteração

*/

/*
  Obtêm elemento do grupo de mensagens
  document.querySelectorAll('[role="presentation"]')[0]?.children[0]?.children[0]?.children[0]?.children[0]
    - Se o ultimo elemento filho do grupo de mensagens for um botão, será o scrollBottomElement

  Obtêm todas as mensagens
  document.querySelectorAll('[data-testid^=conversation-turn]')

  Obtêm a última mensagem
  document.querySelectorAll('[data-scroll-anchor="true"]')

  Obtêm o campo de texto de uma mensagem
  document.querySelectorAll('[data-testid^=conversation-turn]')[119].querySelectorAll('.markdown')

  Obtêm botões ação de uma mensagem
  document.querySelectorAll('[data-testid^=conversation-turn]')[119].querySelectorAll('.mt-1 span button')
    - Se 5 botões serem retornados:
      1. Ler em voz alta
      2. Copiar
      3. Gerar novamente
      4. Resposta insatisfatória
      5. Modelo de alteração

    - Se 1 botão for retornado:
      1. Copiar

*/
