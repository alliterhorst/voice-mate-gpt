import { defaultRecognitionLanguage } from '../config/speech-recognition-languages.config';
import RecognitionEventEnum from '../enum/recognition-event.enum';
import AudioProcessingHelper from '../helper/audio-processing.helper';
import KeepAliveHelper from '../helper/keep-alive.helper';
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

  private audioHelper: AudioProcessingHelper;

  private keepAliveHelper: KeepAliveHelper;

  private microphoneVolume: number;

  constructor() {
    super();
    this.recognition = null;
    this.isListening = false;
    this.transcript = '';
    this.error = '';
    this.language = defaultRecognitionLanguage.code;
    this.forceStop = false;
    this.audioHelper = new AudioProcessingHelper();
    this.keepAliveHelper = new KeepAliveHelper();
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
      this.audioHelper.stopAudioCapture();
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
        this.audioHelper
          .startAudioCapture({
            echoCancellation: true,
            noiseSuppression: true,
            frequencyFilters: {
              lowPassFrequency: 3000,
              highPassFrequency: 300,
            },
          })
          .then(({ analyser }) => {
            if (analyser) {
              this.analyseAudio(analyser);
            }
          });
        this.keepAliveHelper.start(() => {
          if (!this.isListening && !this.forceStop && this.recognition) {
            console.log('[SPEECH-REC] Restarting speech recognition');
            this.start();
          }
        });
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
        this.keepAliveHelper.stop();
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

  private analyseAudio(analyser: AnalyserNode): void {
    const bufferLength = analyser.fftSize;
    const dataArray = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(dataArray);

    let sumSquares = 0.0;

    dataArray.forEach(amplitude => {
      sumSquares += amplitude * amplitude;
    });
    const volume = Math.sqrt(sumSquares / bufferLength);

    const normalizedVolume = Math.round(Math.min(Math.max(volume * 100, 0), 100));

    if (normalizedVolume !== this.microphoneVolume) {
      this.microphoneVolume = normalizedVolume;
      this.notifyListeners(RecognitionEventEnum.UPDATE_MICROPHONE_VOLUME);
    }

    requestAnimationFrame(() => this.analyseAudio(analyser));
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

export default SpeechRecognitionService;
