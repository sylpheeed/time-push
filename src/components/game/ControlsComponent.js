'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import LevelAction from 'actions/LevelAction';

require('styles/game/Controls.sass');


class ControlsComponent extends React.Component {

  handleStart() {
    GameAction.start();
  }

  render() {
    return (
      <div className="controls-component">
        <div className="controls-component-button" onClick={this.handleStart}>
          Play!
          <i className="fa fa-play"></i>
        </div>
      </div>
    );
  }
}

ControlsComponent.displayName = 'GameControlsComponent';

export default ControlsComponent;
