export type GenericListener<T, E> = (service: T, event: E) => void;

interface ListenerConfig<T, E> {
  listener: GenericListener<T, E>;
  eventRestrictions?: E[];
}

class ListenerService<T extends ListenerService<T, E>, E> {
  private listeners: ListenerConfig<T, E>[];

  constructor() {
    this.listeners = [];
  }

  subscribe(listener: GenericListener<T, E>, eventRestrictions?: E[]): void {
    this.listeners.push({ listener, eventRestrictions });
  }

  unsubscribe(listener: GenericListener<T, E>): void {
    this.listeners = this.listeners.filter(l => l.listener !== listener);
  }

  protected notifyListeners(event: E): void {
    this.listeners.forEach(({ listener, eventRestrictions }) => {
      if (!eventRestrictions?.length || eventRestrictions.includes(event)) {
        listener(this as unknown as T, event);
      }
    });
  }
}

export default ListenerService;
