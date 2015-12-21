require('normalize.css');
require('styles/App.css');
require('styles/animate.css');

import React from 'react';
import GameDescription from './game/DescriptionComponent';
import GamePlayfield from './game/PlayfieldComponent';
import GameControls from './game/ControlsComponent';
import GameOverControls from './game/GameOverComponent';
import Scores from './game/ScoresComponent';
import PlayerStore from 'stores/PlayerStore';

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
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._change);
  }


  render() {

    if (this.state.gameOver) {
      return (
        <div className="index">
          <GameOverControls level={this.state.level} scores={this.state.scores}/>
        </div>
      )
    }

    return (
      <div className="index">
        <GameDescription/>
        <GamePlayfield level={this.state.level}/>
        <GameControls level={this.state.level}/>
        <Scores scores={this.state.scores}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
