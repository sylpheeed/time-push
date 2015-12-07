'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
require('styles/game/Controls.sass');

class ControlsComponent extends React.Component {

  handleStart() {
    GameAction.start();
  }

  render() {
    return (
      <div className="controls-component">
        <button onClick={this.handleStart} className="controls-start">Start</button>
      </div>
    );
  }
}

ControlsComponent.displayName = 'GameControlsComponent';

// Uncomment properties you need
// ControlsComponent.propTypes = {};
// ControlsComponent.defaultProps = {};

export default ControlsComponent;
