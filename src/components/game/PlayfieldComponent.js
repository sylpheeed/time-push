'use strict';

import React from 'react';
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
    if (levels[levelName]) {
      return React.createElement(levels[levelName], {level: this.props.level});
    }

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
