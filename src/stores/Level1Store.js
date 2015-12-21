import Helpers from 'sources/helpers';
import Colors from 'sources/Colors';
import BaseStore from './BaseStore.js';
import AppDispatcher from 'sources/AppDispatcher';

let _level = {
  description: 'Level 1',
  roundSeconds: [30, 10, 5, 3],
  blockCount: 4,
  scoresBonus: 1,
  activeColor: Colors.sample()
};

let _currentRound = 0;
let _finish = false;

class Level1Store extends BaseStore {
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

}

let store = new Level1Store();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'game:1:nextRound':
      if (_active) {
        _currentRound += 1;
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
