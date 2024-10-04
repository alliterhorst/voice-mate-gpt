/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    VoiceMateGPT: {
      MainService: MainService;
      SpeechRecognitionService: SpeechRecognitionService;
      DOMManipulationService: DOMManipulationService;
    };
  }
}

export {};
