'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import Colors from 'sources/Colors';
require('styles/game/Playfield.sass');
import Level1 from './levels/Level1Component.js';


class PlayfieldComponent extends React.Component {

  constructor() {
    super();
    this.state = {result: []};
  }

  currentLevel() {
    return React.createElement(Level1, {});
  }

  render() {
    return (
      <div className="playfield-component">
        {this.currentLevel()}
      </div>
    );
  }
}

PlayfieldComponent.displayName = 'GamePlayfieldComponent';

export default PlayfieldComponent;
