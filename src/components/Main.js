require('normalize.css');
require('styles/App.css');
require('styles/animate.css');

import React from 'react';
import GameTimer from './game/TimerComponent';
import GamePlayfield from './game/PlayfieldComponent';
import GameControls from './game/ControlsComponent';
import GameOverControls from './game/GameOverComponent';
import Scores from './game/ScoresComponent';
import PlayerStore from 'stores/PlayerStore';
import GameStore from 'stores/GameStore';

class AppComponent extends React.Component {

  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
  }

  _change() {
    this.setState(this.data());
  }

  data() {
    return {
      level: PlayerStore.level(),
      scores: PlayerStore.scores(),
      gameOver: PlayerStore.gameOver()
    };
  }

  componentDidMount() {
    PlayerStore.addChangeListener(this._change);
    GameStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._change);
    GameStore.removeChangeListener(this._change);
  }

  playField(level) {
    if (GameStore.isActive()) {
      return <GamePlayfield level={level}/>
    }
  }

  gameTimer() {
    if (GameStore.isActive()) {
      return <GameTimer waiting={GameStore.isWaiting()}/>
    } else {
      return <h4 >Press play! button when you will be ready</h4>
    }
  }

  gameControls() {
    if (GameStore.isStop()) {
      return <GameControls active={GameStore.isStop()}/>
    }
  }

  render() {
    if (this.state.gameOver) {
      return (
        <div className="index">
          <GameOverControls level={this.state.level} scores={this.state.scores}/>
        </div>
      )
    }

    let state = this.state;
    return (
      <div className="index">
        {this.gameTimer()}
        {this.playField(state.level)}
        {this.gameControls()}
        <Scores scores={state.scores}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
