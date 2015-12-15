require('normalize.css');
require('styles/App.css');

import React from 'react';
import GameDescription from './game/DescriptionComponent';
import GamePlayfield from './game/PlayfieldComponent';
import GameControls from './game/ControlsComponent';
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
    return (
      <div className="index">
        <GameDescription/>
        <GamePlayfield level={this.state.level}/>
        <GameControls/>
        <Scores scores={this.state.scores}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
