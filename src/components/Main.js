require('normalize.css');
require('styles/App.css');

import React from 'react';
import GameDescription from './game/DescriptionComponent';
import GamePlayfield from './game/PlayfieldComponent.js';
import GameControls from './game/ControlsComponent.js';
import GameStore from 'stores/GameStore';
import GameAction from 'actions/GameAction';

class AppComponent extends React.Component {

  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
  }

  data() {
    return {
      round: GameStore.round(),
      description: GameStore.currentLevel().description,
      time: GameStore.roundTime(),
      active: GameStore.isLevelActive(),
      settings: GameStore.settings(),
      activeBlock: GameStore.activeBlock(),
      activeColor: GameStore.activeColor()
    }
  }

  activateTimer() {
    this.setState({timer: setInterval(this.decreaseTimer.bind(this), 1000)});
  }

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({timer: false});
  }

  decreaseTimer() {
    if (this.state.time > 0) {
      this.setState({
        time: this.state.time - 1
      });
    } else {
      GameAction.defeat()
    }
  }

  _change() {
    this.setState(this.data(), function () {
      if (this.state.active && !this.state.timer) {
        this.activateTimer();
      }
      if (!this.state.active && this.state.timer) {
        this.stopTimer()
      }
    });
  }


  componentDidMount() {
    GameStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this._change);
  }

  render() {
    let game = this.state;
    return (

      <div className="index">
        <GameDescription
          description={game.description}
          time={game.time}
          active={game.active}
          activeColor={game.activeColor}
          />

        <GamePlayfield
          settings={game.settings}
          activeBlock={game.activeBlock}
          activeColor={game.activeColor}
          round={game.round}
          />

        <GameControls/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
