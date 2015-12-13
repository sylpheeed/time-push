import { EventEmitter } from 'events';
import AppDispatcher from '../sources/AppDispatcher';

let _currentLevel = 0;
let _currentRound = 0;

class UserStore extends EventEmitter {

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    return this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

}

let store = new GameStore();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:start':
      if (store.currentLevel().state != _states.active) {
        store.currentLevel().state = _states.active;
        store.emitChange();
      }
      break;
    case 'game:nextRound':
      if (store.currentLevel().state == _states.active) {
        _currentRound += 1;
        if (store.currentLevel().roundSeconds.length == _currentRound) {
          _currentRound = 0;
          _currentLevel += 1;
        }
        store.emitChange();
      }
      break;
  }
  return true;
});

export default store;
