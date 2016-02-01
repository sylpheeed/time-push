import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';

let _level = {
  description: 'Level 3',
  roundSeconds: [30, 20, 10, 5, 3],
  blockCount: 6,
  scoresBonus: 4
};

let _currentRound = 0;
let _finish = false;
let _activeColor = Colors.sample();

class LevelStore extends BaseStore {
  level() {
    return _level;
  }

  activeBlock() {
    return Helpers.getRandom(1, _level.blockCount) - 1;
  }

  roundTime() {
    return _level.roundSeconds[_currentRound];
  }

  isFinish() {
    return _finish;
  }

  activeColor() {
    return _activeColor;
  }

}

let store = new LevelStore();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:3:nextRound':
      _currentRound += 1;
      _activeColor = Colors.sample();
      if (_level.roundSeconds.length == _currentRound) {
        _currentRound = 0;
        _finish = true;
      }
      store.emitChange();
      break;
  }
  return true;
});

export default store;
