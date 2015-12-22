'use strict';
import React from 'react';
import TimerStore from 'stores/TimerStore';
import PlayerAction from 'actions/PlayerAction';
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
      });
    } else {
      this.stopTimer();
      PlayerAction.gameOver();
    }
  }

  _change() {
    this.stopTimer();
    this.setState(this.data(), () => {
      if (this.state.time && !this.timer) {
        this.activateTimer();
      }
    });
  }

  timerView() {
    //if (this.state.active && this.nextRound) {
    //  let className = classNames({
    //    animated: true,
    //    bounceIn: true
    //  });
    //  this.nextRound = false;
    //  return <div className={className}>Next round</div>
    //}

    //let timer = this.state.active ? this.state.time : '';
    return <div className="description-timer">{this.state.time}</div>
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
        {this.timerView()}
      </div>
    );
  }
}

TimerComponent.displayName = 'GameTimerComponent';

export default TimerComponent;
