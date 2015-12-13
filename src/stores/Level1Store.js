import { EventEmitter } from 'events';
import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';


let _states = {
  waiting: 0,
  active: 1
};

let _level = {
  description: 'Select color: ',
  roundSeconds: [30, 20, 10, 5],
  state: _states.waiting,
  blockCount: 4
};

let _currentRound = 0;
let _activeColor = Colors.sample();

class Level1Store extends BaseStore {
  level() {
    return _level;
  }

  activeBlock() {
    return Helpers.getRandom(1, _settings.blockCount) - 1;
  }

  activeColor() {
    return _activeColor;
  }

  roundTime() {
    return _level.roundSeconds[_currentRound];
  }

  round() {
    return _currentRound;
  }

}

let store = new Level1Store();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:1:start':
      if (store.currentLevel().state != _states.active) {
        store.currentLevel().state = _states.active;
        store.emitChange();
      }
      break;
    case 'game:1:nextRound':
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
