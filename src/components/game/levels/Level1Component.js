'use strict';

import React from 'react';
import TimerAction from 'actions/TimerAction';
import Colors from 'sources/Colors';
import LevelStore from 'stores/Level1Store';
import LevelAction from 'actions/LevelAction';
import PlayerAction from 'actions/PlayerAction';
import GameAction from 'actions/GameAction';

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
        GameAction.stop();
      } else {
        TimerAction.seconds(LevelStore.roundTime());
        TimerAction.color(LevelStore.level().activeColor);
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
    let blockStyle = {
      background: Colors.uniqueColor()
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
    Colors.cleanCache(LevelStore.level().activeColor);
    for (let i = 0; i < this.state.blockCount; i++) {
      if (i == this.state.activeBlock) {
        result.push(this.activeBlock(i));
      } else {
        result.push(this.block(i));
      }
    }

    return result;
  }

  componentDidMount() {
    LevelStore.addChangeListener(this._change);
    TimerAction.description(LevelStore.level().description);
    this._change();
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
