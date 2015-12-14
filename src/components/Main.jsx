require('normalize.css');
require('styles/main.scss');

import React from 'react';
import Portal from './portal/portal'

class App extends React.Component {
  render() {
    return (
      <Portal/>
    );
  }
}

App.defaultProps = {
};

export default App;
