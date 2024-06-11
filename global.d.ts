/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    SpeechRecognitionService: SpeechRecognitionService;
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export {};
