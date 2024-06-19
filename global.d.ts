/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    SpeechRecognitionService: SpeechRecognitionService;
    DOMManipulationService: DOMManipulationService;
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export {};
