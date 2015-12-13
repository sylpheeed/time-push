'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import Colors from 'sources/Colors';
import Level1Store from 'stores/Level1Store';
import LevelAction from 'actions/LevelAction';

require('styles/game/levels/Level1.sass');

class Level1Component extends React.Component {

  addUsedColor(color) {
    this.usedColors.push(color);
  }

  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
    this.usedColors = [];
  }

  _change() {
    this.usedColors = [Level1Store.activeColor()];
    this.setState(this.data(), function () {
      GameAction.color(Level1Store.activeColor());
      GameAction.timer(Level1Store.roundTime());
    })
  }

  data() {
    return {
      blockCount: Level1Store.level().blockCount,
      activeBlock: Level1Store.activeBlock(),
      activeColor: Level1Store.activeColor()
    };
  }

  handleActive() {
    LevelAction.nextRound(1);
  }

  handleError() {
    GameAction.defeat();
  }

  block(k) {
    let color = this.state.activeColor;
    while (this.usedColors.indexOf(color) >= 0) {
      color = Colors.sample()
    }
    this.addUsedColor(color);
    let blockStyle = {
      background: color
    };
    return <div onClick={this.handleError} style={blockStyle} key={k} className="playfield-block"></div>;
  }

  activeBlock(k) {
    let blockStyle = {
      background: this.state.activeColor
    };
    return <div onClick={this.handleActive} key={k} style={blockStyle} className="playfield-block"></div>;
  }

  blocks() {
    let result = [];
    if (Level1Store.isActive()) {
      for (let i = 0; i < this.state.blockCount; i++) {
        if (i == this.state.activeBlock) {
          result.push(this.activeBlock(i));
        } else {
          result.push(this.block(i));
        }
      }
    }

    return result;
  }

  componentDidMount() {
    Level1Store.addChangeListener(this._change);
    GameAction.description(Level1Store.level().description)
  }

  componentWillUnmount() {
    Level1Store.removeChangeListener(this._change);
  }

  render() {
    return (
      <div className="level1-component">
        {this.blocks()}
      </div>
    );
  }
}

Level1Component.displayName = 'GameLevelsLevel1Component';

export default Level1Component;
