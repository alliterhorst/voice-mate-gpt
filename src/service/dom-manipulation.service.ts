import ListenerService from './listener.service';

enum DOMManipulationEventEnum {
  CLICK = 'CLICK',
  CHANGE = 'CHANGE',
  INPUT = 'INPUT',
  KEY_DOWN = 'KEYDOWN',
  KEY_UP = 'KEYUP',
  KEY_PRESS = 'KEYPRESS',
}

class DOMManipulationService extends ListenerService<
  DOMManipulationService,
  DOMManipulationEventEnum
> {}

window.DOMManipulationService = new DOMManipulationService();
