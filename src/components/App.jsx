require('styles/style.css');

import React from 'react';
import Dashboard from './dashboard';

class App extends React.Component {
  render() {
    return (
      <div>
          { this.props.children || <Dashboard /> }
      </div>
    );
  }
}

module.exports = App
