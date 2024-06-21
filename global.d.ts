/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    SpeechRecognitionService: SpeechRecognitionService;
    DOMManipulationService: DOMManipulationService;
    OrchestrationService: OrchestrationService;
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export {};
