'use strict';
import React from 'react';
import GameStore from 'stores/GameStore';

require('styles/game/Description.sass');

class DescriptionComponent extends React.Component {
  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
    this.timer = this.timer.bind(this);
  }

  data() {
    return {
      description: GameStore.description(),
      time: GameStore.seconds(),
      active: GameStore.isActive(),
      color: GameStore.color()
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
    if (this.state.time > 0) {
      this.setState({
        time: this.state.time - 1
      });
    } else {
      //GameAction.defeat()
    }
  }

  _change() {
    this.setState(this.data(), () => {
      if (this.state.active && !this.state.timer) {
        this.activateTimer();
      }
      if (!this.state.active && this.state.timer) {
        this.stopTimer()
      }
    });
  }

  timer() {
    return this.state.active ? this.state.time : ''
  }

  componentDidMount() {
    GameStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this._change);
  }

  block() {
    let blockStyle = {
      background: this.state.color
    };
    return <div style={blockStyle} className="active-block"></div>;
  }

  render() {

    return (
      <div className="description-component">
        <div className="description-text">
          {this.state.description}
        </div>
        <div className="description-active-block">
          Active block {this.block()}
        </div>
        <div className="description-timer">
          {this.timer()}
        </div>
      </div>
    );
  }
}

DescriptionComponent.displayName = 'GameDescriptionComponent';

export default DescriptionComponent;
