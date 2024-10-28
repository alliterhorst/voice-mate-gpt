import DOMManipulationService from './src/service/dom-manipulation.service';
import MainService from './src/service/main.service';
import SpeechRecognitionService from './src/service/speech-recognition.service';

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

  interface Navigator extends NavigatorUA {}
  interface WorkerNavigator extends NavigatorUA {}
}

// WICG Spec: https://wicg.github.io/ua-client-hints
declare interface NavigatorUA {
  readonly userAgentData?: NavigatorUAData;
}

// https://wicg.github.io/ua-client-hints/#dictdef-navigatoruabrandversion
interface NavigatorUABrandVersion {
  readonly brand: string;
  readonly version: string;
}

// https://wicg.github.io/ua-client-hints/#dictdef-uadatavalues
interface UADataValues {
  readonly brands?: NavigatorUABrandVersion[];
  readonly mobile?: boolean;
  readonly platform?: string;
  readonly architecture?: string;
  readonly bitness?: string;
  readonly formFactor?: string[];
  readonly model?: string;
  readonly platformVersion?: string;
  /** @deprecated in favour of fullVersionList */
  readonly uaFullVersion?: string;
  readonly fullVersionList?: NavigatorUABrandVersion[];
  readonly wow64?: boolean;
}

// https://wicg.github.io/ua-client-hints/#dictdef-ualowentropyjson
interface UALowEntropyJSON {
  readonly brands: NavigatorUABrandVersion[];
  readonly mobile: boolean;
  readonly platform: string;
}

// https://wicg.github.io/ua-client-hints/#navigatoruadata
interface NavigatorUAData extends UALowEntropyJSON {
  getHighEntropyValues(hints: string[]): Promise<UADataValues>;
  toJSON(): UALowEntropyJSON;
}

export {};
