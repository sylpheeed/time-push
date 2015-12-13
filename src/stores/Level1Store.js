import { EventEmitter } from 'events';
import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';

let _level = {
  description: 'Select color: ',
  roundSeconds: [30, 20, 10, 5],
  blockCount: 4
};

let _currentRound = 0;
let _activeColor = Colors.sample();
let _active = false;

class Level1Store extends BaseStore {
  level() {
    return _level;
  }

  activeBlock() {
    return Helpers.getRandom(1, _level.blockCount) - 1;
  }

  activeColor() {
    return _activeColor;
  }

  roundTime() {
    return _level.roundSeconds[_currentRound];
  }

  isActive() {
    return _active;
  }

}

let store = new Level1Store();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:start':
      _active = true;
      store.emitChange();
      break;
    case 'game:1:nextRound':
      if (_active) {
        _currentRound += 1;
        if (_level.roundSeconds.length == _currentRound) {
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
