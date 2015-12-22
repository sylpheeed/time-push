'use strict';
import React from 'react';
import TimerStore from 'stores/TimerStore';
import PlayerAction from 'actions/PlayerAction';
import GameAction from 'actions/GameAction';
import classNames from 'classnames';

require('styles/game/Timer.sass');

class TimerComponent extends React.Component {
  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
    this.timerView = this.timerView.bind(this);
    this.timer = false;
    this.nextRound = false;
  }

  data() {
    this.nextRound = true;
    return {
      description: TimerStore.description(),
      time: TimerStore.seconds(),
      color: TimerStore.color()
    }
  }

  activateTimer() {
    this.timer = setInterval(this.decreaseTimer.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = false
  }

  decreaseTimer() {
    if (this.state.time > 1) {
      this.setState({
        time: this.state.time - 1
      }, () => {
        if (this.nextRound) {
          this.nextRound = false;
          GameAction.start();
        }
      });
    } else {
      this.stopTimer();
      PlayerAction.gameOver();
    }
  }

  _change() {
    this.stopTimer();
    this.nextRound = true;
    this.setState(this.data(), () => {
      GameAction.waiting();
      if (this.state.time && !this.timer) {
        this.activateTimer();
      }
    });
  }

  timerView() {
    if (this.props.waiting) {
      let className = classNames({
        animated: true,
        bounceIn: true
      });

      return <span className={className}>Next round</span>
    }

    return <span >{this.state.time}</span>
  }

  componentDidMount() {
    TimerStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    TimerStore.removeChangeListener(this._change);
    this.stopTimer();
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
          {this.timerView()}
        </div>

      </div>
    );

  }
}

TimerComponent.displayName = 'GameTimerComponent';

export default TimerComponent;
