//require('styles/style.css');

import React from 'react';
import Dashboard from './dashboard';

require('../styles/style.css');

class App extends React.Component {
  render() {
    return (
      <div className="container">
          { this.props.children || <Dashboard /> }
      </div>
    );
  }
}

module.exports = App
