declare namespace chrome {
  namespace offscreen {
    export enum Reason {
      AUDIO_PLAYBACK = "AUDIO_PLAYBACK",
    }

    export interface CreateDocumentOptions {
      url: string;
      reasons: Reason[];
      justification: string;
    }

    export function createDocument(options: CreateDocumentOptions): Promise<void>;
    export function closeDocument(): Promise<void>;
  }
}
