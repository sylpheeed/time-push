'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import Colors from 'sources/Colors';
import Level1Store from 'stores/Level1Store';

require('styles/game/levels/Level1.sass');

class Level1Component extends React.Component {


  constructor() {
    super();
    this.state = this.data();
  }

  _change() {
    this.setState(this.data())
  }

  data() {
    return {};
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

  blocks() {
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

  componentDidMount() {
    DescriptionStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    DescriptionStore.removeChangeListener(this._change);
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
