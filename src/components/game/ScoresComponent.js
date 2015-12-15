'use strict';

import React from 'react';

require('styles/game/Scores.sass');

class ScoresComponent extends React.Component {
  render() {
    return (
      <div className="scores-component">
        Your scores: <b>{this.props.scores}</b>
      </div>
    );
  }
}

ScoresComponent.displayName = 'GameScoresComponent';

export default ScoresComponent;
