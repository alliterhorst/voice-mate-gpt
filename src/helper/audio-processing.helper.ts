class AudioProcessingHelper {
  private audioContext: AudioContext | null = null;

  private analyser: AnalyserNode | null = null;

  private microphoneStream: MediaStream | null = null;

  async startAudioCapture({
    echoCancellation,
    noiseSuppression,
    frequencyFilters,
  }: {
    echoCancellation?: boolean;
    noiseSuppression?: boolean;
    frequencyFilters?: {
      lowPassFrequency: number;
      highPassFrequency: number;
    };
  } = {}): Promise<{ analyser: AnalyserNode | null }> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation,
          noiseSuppression,
          channelCount: 1,
        },
      });

      const source = this.audioContext.createMediaStreamSource(this.microphoneStream);

      if (frequencyFilters) {
        const lowPassFilter = this.createLowPassFilter(frequencyFilters.lowPassFrequency);
        const highPassFilter = this.createHighPassFilter(frequencyFilters.highPassFrequency);

        source.connect(highPassFilter);
        highPassFilter.connect(lowPassFilter);

        this.analyser = this.audioContext.createAnalyser();
        lowPassFilter.connect(this.analyser);
      } else {
        this.analyser = this.audioContext.createAnalyser();
        source.connect(this.analyser);
      }

      return { analyser: this.analyser };
    } catch (error) {
      console.error('Error capturing audio: ', error);
      return { analyser: null };
    }
  }

  stopAudioCapture(): void {
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach(track => track.stop());
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

  private createLowPassFilter(cutoffFrequency: number = 3000): BiquadFilterNode {
    const lowPassFilter = this.audioContext!.createBiquadFilter();
    lowPassFilter.type = 'lowpass';
    lowPassFilter.frequency.setValueAtTime(cutoffFrequency, this.audioContext!.currentTime);
    return lowPassFilter;
  }

  private createHighPassFilter(cutoffFrequency: number = 300): BiquadFilterNode {
    const highPassFilter = this.audioContext!.createBiquadFilter();
    highPassFilter.type = 'highpass';
    highPassFilter.frequency.setValueAtTime(cutoffFrequency, this.audioContext!.currentTime);
    return highPassFilter;
  }
}

export default AudioProcessingHelper;
