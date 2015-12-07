import AppDispatcher from '../sources/AppDispatcher';

export default {
  start(){
    AppDispatcher.dispatch({
      event: 'game:start'
    });
  },

  nextLevel(){
    AppDispatcher.dispatch({
      event: 'game:nextLevel'
    });
  }
};
