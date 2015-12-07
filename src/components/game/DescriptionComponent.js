'use strict';
import React from 'react';
import GameStore from 'stores/GameStore';

require('styles/game/Description.sass');

class DescriptionComponent extends React.Component {

  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
  }

  data() {
    return {
      description: GameStore.currentLevel().description,
      time: GameStore.currentLevel().time,
      active: GameStore.isLevelActive(),
      started: false
    }
  }

  activateTimer() {
    if (this.state.active && this.state.time > 0) {
      this.setState({
        time: this.state.time - 1,
        started: true
      });
      setTimeout(this.activateTimer.bind(this), 1000)
    }
  }

  _change() {
    this.setState(this.data());
  }

  componentDidMount() {
    GameStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this._change);
  }

  componentDidUpdate() {
    if (!this.state.started) {
      this.activateTimer();
    }
  }

  render() {
    let level = this.state;

    return (
      <div className="description-component">
        <div className="description-text">
          {level.description}
        </div>
        <div className="description-timer">
          {level.time}
        </div>
      </div>
    );
  }
}

DescriptionComponent.displayName = 'GameDescriptionComponent';

export default DescriptionComponent;
