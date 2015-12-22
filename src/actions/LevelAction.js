import AppDispatcher from '../sources/AppDispatcher';

export default {
  nextRound(level){
    AppDispatcher.dispatch({
      event: `game:${level}:nextRound`
    });
  }
};
