import { EventEmitter } from 'events';
import Helpers from 'sources/helpers'
import AppDispatcher from '../sources/AppDispatcher';

let _states = {
  waiting: 0,
  active: 1
};

let _levels = [
  {
    description: 'First level text',
    startTime: 30,
    roundCount: 5,
    state: _states.waiting
  }, {
    description: 'Second level text',
    startTime: 20,
    roundCount: 5,
    state: _states.waiting
  }
];

let _settings = {
  blockCount: 4
};

let _colors = [
  '#FF0000',
  '#FFC000',
  '#E0FF00',
  '#7EFF00',
  '#21FF00',
  '#00FF41',
  '#00FF9F',
  '#00FDFF',
  '#009FFF',
  '#003DFF',
  '#2100FF',
  '#8300FF',
  '#E500FF',
  '#0052FF',
  '#FF007C',
  '#1000FF'
];

let _currentLevel = 0;
let _currentRound = 1;
let _activeColor = Helpers.getRandom(0, _colors.length - 1);

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
    return _colors[_activeColor];
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
        if (store.currentLevel().roundCount > _currentRound) {
          store.currentLevel().startTime = parseInt(store.currentLevel().startTime / 2)
        } else {
          _currentRound = 1;
          _currentLevel += 1;
        }
        store.emitChange();
      }
      break;
  }
  return true;
});

export default store;
