import { EventEmitter } from 'events';
import AppDispatcher from '../sources/AppDispatcher';

const _defaultLevel = 1;

let _level = _defaultLevel;
let _scores = 0;
let _gameOver = false;

class PlayerStore extends EventEmitter {

  level() {
    return _level;
  }

  scores() {
    return _scores;
  }

  gameOver() {
    return _gameOver;
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

let store = new PlayerStore();

AppDispatcher.register(function (payload) {
  switch (payload.event) {
    case 'player:addScores':
      if (payload.scores && payload.scores > 0) {
        _scores += payload.scores;
        store.emitChange();
      }
      break;
    case 'player:levelUp':
      _level += 1;
      store.emitChange();
      break;
    case 'player:gameOver':
      _gameOver = true;
      store.emitChange();
      break;
    case 'player:repeat':
      _level = _defaultLevel;
      _scores = 0;
      _gameOver = false;
      store.emitChange();
      break;
  }
  return true;
});

export default store;
