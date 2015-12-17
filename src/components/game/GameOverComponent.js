'use strict';

import React from 'react';

require('styles/game/GameOver.sass');

class GameOverComponent extends React.Component {
  render() {
    return (
      <div className="gameover-component">
        <div>Game Over</div>
        <div>Level: <b>{this.props.level}</b></div>
        <div>Scores: <b>{this.props.scores}</b></div>
      </div>
    );
  }
}

GameOverComponent.displayName = 'GameGameOverComponent';

export default GameOverComponent;
