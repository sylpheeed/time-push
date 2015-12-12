'use strict';
import React from 'react';
import GameStore from 'stores/GameStore';

require('styles/game/Description.sass');

class DescriptionComponent extends React.Component {
  block() {
    let blockStyle = {
      background: this.props.activeColor
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
