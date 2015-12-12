'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import Colors from 'sources/Colors';
require('styles/game/Playfield.sass');

class PlayfieldComponent extends React.Component {

  constructor() {
    super();
    this.state = {result: []};
  }

  handleActive() {
    GameAction.nextLevel();
  }

  handleError() {
    GameAction.defeat();
  }

  block(k) {
    let blockStyle = {
      background: Colors.sample()
    };
    return <div onClick={this.handleError} style={blockStyle} key={k} className="playfield-block"></div>;
  }

  activeBlock(k) {
    let blockStyle = {
      background: this.props.activeColor
    };
    return <div onClick={this.handleActive} key={k} style={blockStyle} className="playfield-block"></div>;
  }

  isRoundChanged() {
    return this.state.round == undefined || this.state.round != this.props.round;
  }

  blocks() {
    if (this.isRoundChanged()) {
      let state = {round: this.props.round, result: []};
      let settings = this.props.settings;

      for (let i = 0; i < settings.blockCount; i++) {
        if (i == this.props.activeBlock) {
          state.result.push(this.activeBlock(i));
        } else {
          state.result.push(this.block(i));
        }
      }
      this.setState(state);
    }
  }

  componentDidUpdate() {
    this.blocks();
  }


  render() {
    return (
      <div className="playfield-component">
        {this.state.result}
      </div>
    );
  }
}

PlayfieldComponent.displayName = 'GamePlayfieldComponent';

export default PlayfieldComponent;
