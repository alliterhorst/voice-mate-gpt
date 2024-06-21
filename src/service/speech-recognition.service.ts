import { defaultRecognitionLanguage } from '../config/speech-recognition-languages.config';
import RecognitionEventEnum from '../enum/recognition-event.enum';
import ListenerService from './listener.service';

class SpeechRecognitionService extends ListenerService<
  SpeechRecognitionService,
  RecognitionEventEnum
> {
  private recognition: SpeechRecognition | null;

  private isListening: boolean;

  private forceStop: boolean;

  private transcript: string;

  private error: string;

  private language: string;

  private keepAliveInterval: NodeJS.Timeout | null;

  private audioContext: AudioContext | null;

  private analyser: AnalyserNode | null;

  private microphoneStream: MediaStream | null;

  private microphoneVolume: number;

  constructor() {
    super();
    this.recognition = null;
    this.isListening = false;
    this.transcript = '';
    this.error = '';
    this.language = defaultRecognitionLanguage.code;
    this.forceStop = false;
    this.keepAliveInterval = null;
    this.audioContext = null;
    this.analyser = null;
    this.microphoneStream = null;
    this.microphoneVolume = 0;

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
      this.notifyListeners(RecognitionEventEnum.UPDATE_IS_LISTENING);
    };

    this.recognition.onend = (): void => {
      this.isListening = false;
      this.stopAudioCapture();
      console.log('SpeechRecognitionService onend');
      this.notifyListeners(RecognitionEventEnum.UPDATE_IS_LISTENING);
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
      this.isListening = false;
      this.error = `Error occurred in speech recognition: ${event.error}`;
      this.notifyListeners(RecognitionEventEnum.UPDATE_ERROR);
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent): void => {
      this.transcript = event.results[event.results.length - 1][0].transcript || '';
      this.notifyListeners(RecognitionEventEnum.UPDATE_TRANSCRIPT);
    };
  }

  start(): void {
    if (this.recognition && !this.isListening) {
      this.forceStop = false;
      try {
        this.recognition.start();
        this.startAudioCapture();
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
    const currentIsListening = this.isListening;
    if (this.recognition && this.language !== lang) {
      if (currentIsListening) this.stop(true);

      this.language = lang;
      this.recognition.lang = lang;
      if (currentIsListening) this.start();
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

  private async startAudioCapture(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
      this.analyser = this.audioContext.createAnalyser();
      source.connect(this.analyser);

      this.analyseAudio();
    } catch (error) {
      console.error('Error capturing audio: ', error);
    }
  }

  private stopAudioCapture(): void {
    if (this.microphoneStream) {
      const tracks = this.microphoneStream.getTracks();
      tracks.forEach(track => track.stop());
      this.microphoneStream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
  }

  private analyseAudio(): void {
    if (!this.analyser) return;

    const bufferLength = this.analyser.fftSize;
    const dataArray = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(dataArray);

    let sumSquares = 0.0;

    dataArray.forEach(amplitude => {
      sumSquares += amplitude * amplitude;
    });
    const volume = Math.sqrt(sumSquares / bufferLength);

    const normalizedVolume = Math.round(Math.min(Math.max(volume * 100, 0), 100));

    if (normalizedVolume !== this.microphoneVolume) {
      // console.log('Microphone volume:', normalizedVolume);
      this.microphoneVolume = normalizedVolume;
      this.notifyListeners(RecognitionEventEnum.UPDATE_MICROPHONE_VOLUME);
    }

    requestAnimationFrame(() => this.analyseAudio());
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  getTranscript(): string {
    return this.transcript;
  }

  getMicrophoneVolume(): number {
    return this.microphoneVolume;
  }

  getError(): string {
    return this.error;
  }
}

window.SpeechRecognitionService = new SpeechRecognitionService();
