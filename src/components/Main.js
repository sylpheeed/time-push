require('normalize.css');
require('styles/App.css');

import React from 'react';
import GameDescription from './game/DescriptionComponent';
import GamePlayfield from './game/PlayfieldComponent.js';
import GameControls from './game/ControlsComponent.js';


class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <GameDescription/>
        <GamePlayfield/>
        <GameControls/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
