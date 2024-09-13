import './speech-recognition.service';
import './dom-manipulation.service';
// import '../common/audio-downloader.common';
import RecognitionEventEnum from '../enum/recognition-event.enum';
import ListenerService from './listener.service';

enum OrchestrationEventEnum {
  EVENT = 'EVENT',
}

class OrchestrationService extends ListenerService<OrchestrationService, OrchestrationEventEnum> {
  private currentPath: string;

  constructor() {
    super();
    this.currentPath = window.location.pathname;
    this.init();
  }

  private init(): void {
    window.SpeechRecognitionService.subscribe(this.handleSpeechRecognitionEvent, [
      RecognitionEventEnum.UPDATE_TRANSCRIPT,
    ]);
    console.log('OrchestrationService init', this);
  }

  private handleSpeechRecognitionEvent = (
    service: typeof window.SpeechRecognitionService,
    recognitionEventEnum: RecognitionEventEnum,
  ): void => {
    console.log('OrchestrationService handleSpeechRecognitionEvent', recognitionEventEnum);
    window.DOMManipulationService.updatePrompt(service.getTranscript()?.trim() || '');
    this.notifyListeners(OrchestrationEventEnum.EVENT);
  };
}

export default OrchestrationService;
