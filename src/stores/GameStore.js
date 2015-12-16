import { EventEmitter } from 'events';
import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';


let _states = {
  waiting: 0,
  active: 1
};

let _description;
let _seconds;
let _state;
let _color;

class GameStore extends BaseStore {
  description() {
    return _description;
  }

  seconds() {
    return _seconds;
  }

  color() {
    return _color;
  }

  isActive() {
    return _state == _states.active;
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
    case 'game:finish':
      if (_state == _states.active) {
        _state = _states.waiting;
        store.emitChange();
      }
      break;
    case 'game:description':
      _description = payload.description;
      store.emitChange();
      break;
    case 'game:timer':
      _seconds = payload.seconds;
      store.emitChange();
      break;

    case 'game:color':
      _color = payload.color;
      store.emitChange();
      break;
  }
  return true;
});

export default store;
