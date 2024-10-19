class KeepAliveHelper {
  private keepAliveInterval: NodeJS.Timeout | null = null;

  start(action: () => void, interval: number = 1000): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
    }
    this.keepAliveInterval = setInterval(() => {
      action();
    }, interval);
  }

  stop(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
}

export default KeepAliveHelper;
