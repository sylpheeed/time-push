'use strict';
import React from 'react';
import GameStore from 'stores/GameStore';
import PlayerAction from 'actions/PlayerAction';
import classNames from 'classnames';

require('styles/game/Description.sass');

class DescriptionComponent extends React.Component {
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
      description: GameStore.description(),
      time: GameStore.seconds(),
      active: GameStore.isActive(),
      color: GameStore.color()
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
      if (this.state.active && !this.timer) {
        this.activateTimer();
      }

    });
  }

  timerView() {

    if (this.state.active && this.nextRound) {
      let className = classNames({
        animated: true,
        bounceIn: true
      });
      this.nextRound = false;
      return <div className={className}>Next round</div>
    }

    let timer = this.state.active ? this.state.time : '';
    return <div className="description-timer">{timer}</div>
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
        {this.timerView()}
      </div>
    );
  }
}

DescriptionComponent.displayName = 'GameDescriptionComponent';

export default DescriptionComponent;
