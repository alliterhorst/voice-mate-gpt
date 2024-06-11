type SpeechRecognitionListener = (service: SpeechRecognitionService) => void;

class SpeechRecognitionService {
  private recognition: SpeechRecognition | null;

  private listeners: SpeechRecognitionListener[];

  private isListening: boolean;

  private forceStop: boolean;

  private transcript: string;

  private error: string;

  private language: string;

  private keepAliveInterval: NodeJS.Timeout | null;

  constructor() {
    this.recognition = null;
    this.listeners = [];
    this.isListening = false;
    this.transcript = '';
    this.error = '';
    this.language = 'en-US';
    this.forceStop = false;
    this.keepAliveInterval = null;

    this.init();
  }

  private init(): void {
    console.log('SpeechRecognitionService init');
    const SpeechRecognitionConstructor = window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      console.error('Speech recognition is not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognitionConstructor();

    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.lang = this.language;

    this.recognition.onstart = (): void => {
      this.isListening = true;
      this.notifyListeners();
    };

    this.recognition.onend = (): void => {
      this.isListening = false;
      console.log('SpeechRecognitionService onend');
      this.notifyListeners();
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
      this.isListening = false;
      this.error = `Error occurred in speech recognition: ${event.error}`;
      this.notifyListeners();
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent): void => {
      this.transcript = event.results[event.results.length - 1][0].transcript || '';
      console.log('SpeechRecognitionService onresult:', this.transcript);
      this.notifyListeners();
    };
  }

  start(): void {
    if (this.recognition && !this.isListening) {
      this.forceStop = false;
      try {
        this.recognition.start();
        this.startKeepAlive();
      } catch (error) {
        console.log('SpeechRecognitionService start error:', error);
      }
    }
  }

  stop(forceStop?: boolean): void {
    if (forceStop) {
      this.forceStop = forceStop;
    }
    this.isListening = false;
    if (this.recognition) {
      this.recognition.stop();
      if (this.forceStop) {
        this.stopKeepAlive();
      }
    }
  }

  changeLanguage(lang: string): void {
    if (this.recognition && this.language !== lang) {
      this.stop(true);
      this.language = lang;
      this.recognition.lang = lang;
      this.start();
    }
  }

  private startKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
    }
    this.keepAliveInterval = setInterval((): void => {
      if (!this.isListening && !this.forceStop && this.recognition) {
        console.log('[SPEECH-REC] Restarting speech recognition');
        this.start();
      }
    }, 1000);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  subscribe(listener: SpeechRecognitionListener): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: SpeechRecognitionListener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this));
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  getTranscript(): string {
    return this.transcript;
  }

  getError(): string {
    return this.error;
  }
}

window.SpeechRecognitionService = new SpeechRecognitionService();
