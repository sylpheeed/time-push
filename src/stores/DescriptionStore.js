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

class DescriptionStore extends BaseStore {
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

let store = new DescriptionStore();

AppDispatcher.register(function (payload) {
  let data = payload.data;
  switch (payload.event) {
    case 'game:start':
      if (_state != _states.active) {
        _description = data.description;
        _state.state = _states.active;
        store.emitChange();
      }
      break;
    case 'game:timer':
      if (_state == _states.active) {
        _seconds = data.seconds;
        store.emitChange();
      }
      break;

    case 'game:color':
      if (_state == _states.active) {
        _color = data.color;
        store.emitChange();
      }
      break;
  }
  return true;
});

export default store;
