import AppDispatcher from '../sources/AppDispatcher';

export default {
  start(){
    AppDispatcher.dispatch({
      event: 'game:start'
    });
  },

  finish(){
    AppDispatcher.dispatch({
      event: 'game:finish'
    });
  },

  timer(seconds){
    AppDispatcher.dispatch({
      event: 'game:timer',
      seconds: seconds
    });
  },

  color(color){
    AppDispatcher.dispatch({
      event: 'game:color',
      color: color
    });
  },

  description(description){
    AppDispatcher.dispatch({
      event: 'game:description',
      description: description
    });
  }
};
