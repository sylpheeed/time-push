'use strict';

import React from 'react';
import PlayerAction from 'actions/PlayerAction';
import GameAction from 'actions/GameAction';

require('styles/game/GameOver.sass');

class GameOverComponent extends React.Component {
  handleRepeat() {
    PlayerAction.repeat();
  }

  render() {
    return (
      <div className="gameover-component">
        <div>Game Over</div>
        <div>Level: <b>{this.props.level}</b></div>
        <div>Scores: <b>{this.props.scores}</b></div>
        <div className="controls-component-button" onClick={this.handleRepeat}>
          Repeat
          <i className="fa fa-play"></i>
        </div>
      </div>
    );
  }
}

GameOverComponent.displayName = 'GameGameOverComponent';

export default GameOverComponent;
