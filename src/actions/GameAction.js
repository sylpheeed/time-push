import AppDispatcher from '../sources/AppDispatcher';

export default {
  start(){
    AppDispatcher.dispatch({
      event: 'game:start'
    });
  },

  stop(){
    AppDispatcher.dispatch({
      event: 'game:stop'
    });
  },


  waiting(){
    AppDispatcher.dispatch({
      event: 'game:waiting'
    });
  }

};
