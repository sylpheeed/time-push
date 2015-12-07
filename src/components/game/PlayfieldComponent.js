'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
require('styles/game/Playfield.sass');

class PlayfieldComponent extends React.Component {

  handleActive() {
    GameAction.nextLevel();
  }

  block(k) {
    return <div key={k} className="playfield-block"></div>;
  }

  activeBlock(k) {
    let blockStyle = {
      background: this.props.activeColor
    };
    return <div onClick={this.handleActive} key={k} style={blockStyle} className="playfield-block"></div>;
  }

  blocks() {
    let settings = this.props.settings;
    let result = [];

    for (let i = 0; i < settings.blockCount; i++) {
      if (i == this.props.activeBlock) {
        result.push(this.activeBlock(i));
      } else {
        result.push(this.block(i));
      }
    }

    return result;
  }


  render() {
    return (
      <div className="playfield-component">
        {this.blocks()}
      </div>
    );
  }
}

PlayfieldComponent.displayName = 'GamePlayfieldComponent';

export default PlayfieldComponent;
