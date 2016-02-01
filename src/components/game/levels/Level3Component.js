'use strict';

import React from 'react';
import Colors from 'sources/Colors';
import LevelStore from 'stores/Level3Store';
import LevelAction from 'actions/LevelAction';
import PlayerAction from 'actions/PlayerAction';
import GameAction from 'actions/GameAction';
import TimerAction from 'actions/TimerAction';
import classNames from 'classnames';
require('styles/game/levels/Level3.sass');

class Level2Component extends React.Component {
  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.currentRound = 0;
  }

  _change() {
    this.setState(this.data(), function () {
      if (LevelStore.isFinish()) {
        //PlayerAction.levelUp();
        GameAction.stop();
      } else {
        TimerAction.seconds(LevelStore.roundTime());
        TimerAction.color(LevelStore.activeColor());
      }
    })

  }

  data() {
    return {
      blockCount: LevelStore.level().blockCount,
      activeBlock: LevelStore.activeBlock(),
      activeColor: LevelStore.activeColor()
    };
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

    return (
      <div className="bordered"  key={k}>
        <div onClick={this.handleError} style={blockStyle} className="playfield-block animated fadeOut"></div>
      </div>
    )
  }

  activeBlock(k) {
    let blockStyle = {
      background: this.state.activeColor
    };

    return (
      <div className="bordered" key={k}>
        <div onClick={this.handleActive} style={blockStyle} className="playfield-block animated fadeOut"></div>
      </div>
    )
  }

  blocks() {
    let result = [];
    Colors.cleanCache(LevelStore.activeColor());

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
      <div className="level3-component">
        {this.blocks()}
      </div>
    );
  }
}

Level2Component.displayName = 'GameLevelsLevel3Component';


export default Level2Component;
