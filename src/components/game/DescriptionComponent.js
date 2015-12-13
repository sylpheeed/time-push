'use strict';
import React from 'react';
import DescriptionStore from 'stores/DescriptionStore';

require('styles/game/Description.sass');

class DescriptionComponent extends React.Component {
  constructor() {
    super();
    this.state = this.data();
    this._change = this._change.bind(this);
  }

  data() {
    return {
      description: DescriptionStore.description(),
      time: DescriptionStore.seconds(),
      active: DescriptionStore.isActive(),
      color: DescriptionStore.color()
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
    this.setState(this.data(), function () {
      if (this.state.active && !this.state.timer) {
        this.activateTimer();
      }
      if (!this.state.active && this.state.timer) {
        this.stopTimer()
      }
    });
  }


  componentDidMount() {
    DescriptionStore.addChangeListener(this._change);
  }

  componentWillUnmount() {
    DescriptionStore.removeChangeListener(this._change);
  }

  block() {
    let blockStyle = {
      background: this.state.color
    };
    return <div style={blockStyle} className="active-block"></div>;
  }

  render() {
    let level = this.props;

    return (
      <div className="description-component">
        <div className="description-text">
          {level.description}
        </div>
        <div className="description-active-block">
          Active block {this.block()}
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
