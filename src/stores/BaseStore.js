import { EventEmitter } from 'events';

class BaseStore extends EventEmitter {

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

export default BaseStore;
