import AppDispatcher from '../sources/AppDispatcher';

export default {
  levelUp(){
    AppDispatcher.dispatch({
      event: 'player:levelUp'
    });
  },

  addScores(scores){
    AppDispatcher.dispatch({
      event: 'player:addScores',
      scores: scores
    });
  }
};