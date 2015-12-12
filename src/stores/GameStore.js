import { EventEmitter } from 'events';
import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import AppDispatcher from '../sources/AppDispatcher';

let _states = {
  waiting: 0,
  active: 1
};

let _levels = [
  {
    description: 'Select color: ',
    roundSeconds: [30, 20, 10, 5],
    state: _states.waiting
  }, {
    description: 'Second level text',
    roundSeconds: [30, 20, 10, 5],
    state: _states.waiting
  }
];

let _settings = {
  blockCount: 4
};


let _currentLevel = 0;
let _currentRound = 0;
let _activeColor = Colors.sample();

var _private = {
  changeColor(){
    _activeColor = Colors.sample();
  }
};

class GameStore extends EventEmitter {
  currentLevel() {
    return _levels[_currentLevel];
  }

  isLevelActive() {
    return _levels[_currentLevel].state == _states.active;
  }

  activate() {
    _levels[_currentLevel].state = _states.active;
  }

  activeBlock() {
    return Helpers.getRandom(1, _settings.blockCount) - 1;
  }

  settings() {
    return _settings;
  }

  activeColor() {
    return _activeColor;
  }

  roundTime() {
    return _levels[_currentLevel].roundSeconds[_currentRound];
  }

  round() {
    return _currentRound;
  }

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
