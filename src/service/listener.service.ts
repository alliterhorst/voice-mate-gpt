export type GenericListener<T, E> = (service: T, event: E) => void;

class ListenerService<T extends ListenerService<T, E>, E> {
  private listeners: GenericListener<T, E>[];

  constructor() {
    this.listeners = [];
  }

  subscribe(listener: GenericListener<T, E>): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: GenericListener<T, E>): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  protected notifyListeners(event: E): void {
    this.listeners.forEach(listener => listener(this as unknown as T, event));
  }
}

export default ListenerService;
