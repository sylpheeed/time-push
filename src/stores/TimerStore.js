import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';

let _description;
let _seconds;
let _color;

class TimerStore extends BaseStore {
  description() {
    return _description;
  }

  seconds() {
    return _seconds;
  }

  color() {
    return _color;
  }
}

let store = new TimerStore();

AppDispatcher.register(function (payload) {

  switch (payload.event) {
    case 'timer:change':
      _description = payload.description;
      _seconds = payload.seconds;
      store.emitChange();
      break;
    case 'timer:color':
      _color = payload.color;
      store.emitChange();
      break;

  }
  return true;
});

export default store;
