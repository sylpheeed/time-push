import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';


let _states = {
  waiting: 0,
  active: 1,
  stop: 2
};

let _state = _states.stop;

class GameStore extends BaseStore {

  isActive() {
    return _state == _states.active;
  }

  isWaiting() {
    return _state == _states.waiting;
  }

  isStop() {
    return _state == _states.stop;
  }
}

let store = new GameStore();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:start':
      if (_state != _states.active) {
        _state = _states.active;
        store.emitChange();
      }
      break;
    case 'game:waiting':
      if (_state == _states.active) {
        _state = _states.waiting;
        store.emitChange();
      }
      break;
    case 'game:stop':
      if (_state == _states.active) {
        _state = _states.stop;
        store.emitChange();
      }
      break;
  }
  return true;
});

export default store;
