// import '../common/audio-downloader.common';
import RecognitionEventEnum from '../enum/recognition-event.enum';
import ListenerService from './listener.service';
import SpeechRecognitionService from './speech-recognition.service';
import DOMManipulationService from './dom-manipulation.service';

enum MainEventEnum {
  EVENT = 'EVENT',
}

class MainService extends ListenerService<MainService, MainEventEnum> {
  private currentPath: string;

  public VoiceMateGPT: {
    MainService: MainService;
    SpeechRecognitionService: SpeechRecognitionService;
    DOMManipulationService: DOMManipulationService;
  };

  constructor() {
    super();
    this.currentPath = window.location.pathname;
    this.VoiceMateGPT = {
      MainService: this,
      SpeechRecognitionService: new SpeechRecognitionService(),
      DOMManipulationService: new DOMManipulationService(),
    };
    this.init();
    this.startReferenceUpdater();
  }

  private init(): void {
    window.VoiceMateGPT = this.VoiceMateGPT;
    console.log('VoiceMateGPT atribuído:', window.VoiceMateGPT);
    this.VoiceMateGPT.SpeechRecognitionService.subscribe(this.handleSpeechRecognitionEvent, [
      RecognitionEventEnum.UPDATE_TRANSCRIPT,
    ]);
    console.log('MainService init', this);
  }

  private handleSpeechRecognitionEvent = (
    service: typeof this.VoiceMateGPT.SpeechRecognitionService,
    recognitionEventEnum: RecognitionEventEnum,
  ): void => {
    console.log('MainService handleSpeechRecognitionEvent', recognitionEventEnum);
    this.VoiceMateGPT.DOMManipulationService.updatePrompt(service.getTranscript()?.trim() || '');
    this.notifyListeners(MainEventEnum.EVENT);
  };

  private startReferenceUpdater(): void {
    setInterval(() => {
      if (!window.VoiceMateGPT) {
        window.VoiceMateGPT = this.VoiceMateGPT;
        console.log('VoiceMateGPT updated window reference', window.VoiceMateGPT);
      }
    }, 1000);
  }
}

export default MainService;
