'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import Colors from 'sources/Colors';
require('styles/game/Playfield.sass');
import Level1 from './levels/Level1Component.js';
import Level2 from './levels/Level2Component.js';

let levels = {
  Level1,
  Level2
};

class PlayfieldComponent extends React.Component {

  currentLevel() {
    let levelName = `Level${this.props.level}`;
    console.warn(levelName);
    return React.createElement(levels[levelName], {});
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
