import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';

let _level = {
  description: 'Level 2',
  roundSeconds: [30, 20, 10, 5],
  blockCount: 6,
  scoresBonus: 2
};

let _currentRound = 0;
let _active = false;
let _finish = false;
let _activeColor = Colors.sample();

class Level2Store extends BaseStore {
  level() {
    return _level;
  }

  activeBlock() {
    return Helpers.getRandom(1, _level.blockCount) - 1;
  }

  roundTime() {
    return _level.roundSeconds[_currentRound];
  }

  isActive() {
    return _active;
  }

  isFinish() {
    return _finish;
  }

  activeColor() {
    return _activeColor;
  }

}

let store = new Level2Store();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:2:start':
      _active = true;
      store.emitChange();
      break;
    case 'game:2:nextRound':
      if (_active) {
        _currentRound += 1;
        _activeColor = Colors.sample();
        if (_level.roundSeconds.length == _currentRound) {
          _currentRound = 0;
          _finish = true;
        }
        store.emitChange();
      }
      break;
  }
  return true;
});

export default store;