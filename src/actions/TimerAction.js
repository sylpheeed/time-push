import AppDispatcher from '../sources/AppDispatcher';

export default {
  seconds(seconds){
    AppDispatcher.dispatch({
      event: 'timer:seconds',
      seconds
    });
  },

  description(description){
    AppDispatcher.dispatch({
      event: 'timer:description',
      description
    });
  },

  color(color){
    AppDispatcher.dispatch({
      event: 'timer:color',
      color
    });
  }

};
