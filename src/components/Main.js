require('normalize.css');
require('styles/App.css');

import React from 'react';
import GameDescription from './game/DescriptionComponent';
import GamePlayfield from './game/PlayfieldComponent.js';
import GameControls from './game/ControlsComponent.js';
import GameStore from 'stores/GameStore'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <GameDescription />

        <GamePlayfield settings={GameStore.settings()}
                       activeBlock={GameStore.activeBlock()}
                       activeColor={GameStore.activeColor()}/>

        <GameControls/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
