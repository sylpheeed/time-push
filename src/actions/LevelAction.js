import AppDispatcher from '../sources/AppDispatcher';

export default {
  start(level){
    AppDispatcher.dispatch({
      event: `game:${level}:start`
    });
  },

  nextRound(level){
    AppDispatcher.dispatch({
      event: `game:${level}:nextRound`
    });
  }
};
