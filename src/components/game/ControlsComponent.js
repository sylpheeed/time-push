'use strict';

import React from 'react';
import GameAction from 'actions/GameAction';
import LevelAction from 'actions/LevelAction';
import GameStore from 'stores/GameStore';
require('styles/game/Controls.sass');


class ControlsComponent extends React.Component {


  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
  }

  data() {
    return {
      show: !GameStore.isActive()
    };
  }

  handleStart(level) {
    GameAction.start();
    LevelAction.start(level);
  }

  _change() {
    this.setState(this.data());
  }

  startButton() {
    if (this.state.show) {
      return <button onClick={this.handleStart.bind(null, this.props.level)} className="controls-start">Start</button>;
    }
  }

  componentDidMount() {
    GameStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this._change);
  }

  render() {
    return (
      <div className="controls-component">
        {this.startButton()}
      </div>
    );
  }
}

ControlsComponent.displayName = 'GameControlsComponent';

// Uncomment properties you need
// ControlsComponent.propTypes = {};
// ControlsComponent.defaultProps = {};

export default ControlsComponent;
