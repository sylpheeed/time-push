'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import Colors from 'sources/Colors';
import LevelStore from 'stores/Level1Store';
import LevelAction from 'actions/LevelAction';
import PlayerAction from 'actions/PlayerAction';

require('styles/game/levels/Level1.sass');

class Level1Component extends React.Component {

  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.usedColors = [];
  }

  _change() {
    this.usedColors = [LevelStore.level().activeColor];
    this.setState(this.data(), function () {
      if (LevelStore.isFinish()) {
        PlayerAction.levelUp();
        GameAction.finish();
      } else {
        GameAction.color(LevelStore.level().activeColor);
        GameAction.timer(LevelStore.roundTime());
      }
    })

  }

  data() {
    return {
      blockCount: LevelStore.level().blockCount,
      activeBlock: LevelStore.activeBlock(),
      activeColor: LevelStore.level().activeColor
    };
  }

  addUsedColor(color) {
    this.usedColors.push(color);
  }


  handleActive() {
    PlayerAction.addScores(LevelStore.level().scoresBonus);
    LevelAction.nextRound(this.props.level);
  }

  handleError() {
    PlayerAction.gameOver();
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
    if (LevelStore.isActive()) {
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
    LevelStore.addChangeListener(this._change);
    GameAction.description(LevelStore.level().description)
  }

  componentWillUnmount() {
    LevelStore.removeChangeListener(this._change);
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
