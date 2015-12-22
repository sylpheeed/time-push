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


  color(color){
    AppDispatcher.dispatch({
      event: 'game:color',
      color: color
    });
  }

};
