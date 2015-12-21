import AppDispatcher from '../sources/AppDispatcher';

export default {
  change(seconds, description){
    AppDispatcher.dispatch({
      event: 'timer:change',
      seconds,
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
