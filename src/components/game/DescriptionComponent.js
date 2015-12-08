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
      startTime: GameStore.currentLevel().startTime,
      active: GameStore.isLevelActive()
    }
  }

  activateTimer() {
    this.setState({timer: setInterval(this.decreaseTimer.bind(this), 1000)});
  }

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({timer: false});
  }

  decreaseTimer() {
    this.setState({
      startTime: this.state.startTime - 1,
      level: GameStore.currentLevel().id
    });
  }

  _change() {
    this.setState(this.data(), function () {
      if (this.state.active && !this.state.timer) {
        this.activateTimer();
      } else if (!this.state.active && this.state.timer) {
        this.stopTimer()
      }
    });
  }

  componentDidMount() {
    GameStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this._change);
  }


  render() {
    let level = this.state;

    return (
      <div className="description-component">
        <div className="description-text">
          {level.description}
        </div>
        <div className="description-timer">
          {level.startTime}
        </div>
      </div>
    );
  }
}

DescriptionComponent.displayName = 'GameDescriptionComponent';

export default DescriptionComponent;
