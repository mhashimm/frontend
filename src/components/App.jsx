import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Breadcrumbs from 'react-breadcrumbs'
import { routeActions } from 'react-router-redux'
import Dashboard from './dashboard'
import { OnlineStatus } from './elements'

require('offline-plugin/runtime').install()
require('../styles/style.css')

class App extends Component {
  componentWillMount(){
    if(!this.props.user.authenticated)
      this.props.actions.push('/login')
  }

  render() {
    return (
      <div className='container'>
        <div className="row" style={{height: 100}}>
          <div className="col-xs-2 logo">
            <div className="row">
              <Link to="/">
                <svg className="col-md-6" style={{height: 80, width: 100}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331.3 331.3" version="1.1" id="logo" x="0" y="0"><path d="m30.4 317.5 4.4-17.7-12.2-4.8-8.4 13.8c0 0 4.6 12.5-0.5 22.5 0 0 6.4-10.9 16.7-13.9zM22.2 309.4 22.2 309.4 22.2 309.4 22.2 309.4 22.2 309.4" id="logo-tip"/><path d="m22.2 309.4c1.5-0.6 3.2 0.1 3.9 1.6 0.6 1.5-0.1 3.2-1.6 3.8-1.5 0.6-3.2-0.1-3.9-1.6-0.6-1.5 0.1-3.2 1.6-3.8z" id="logo-circle"/><path d="m158.4 112.6c-35.1 28.8-81.1 88.1-120.1 157.4l0 0-6.8 12 7.3 2.8 3.8-10.1c20.8-37.5 77.2-135.4 180.4-200.5 0 0 38.4-22.9 76.3-54.5-9.2 7.7-27.4 17.4-37.2 23.6-25.9 16.3-57.8 31.7-103.6 69.3z" id="logo-middle"/><path d="m33.2 215.4c-8 28.2-7.5 49.7-4.4 55.6l4.8 0C46.9 243.4 111.2 143.3 151.1 112 192.6 79.5 224.5 60.6 251.4 46.9c9.4-4.8 19.1-11.4 27.8-17.9 10.6-8.4 21.3-17.3 30.8-26.1L282.7 20.8 294.9 2.1 271.7 25.8 286.8 0c-35.7 3.2-68.9 21.1-68.9 21.1-13.3 15.7-24 40.8-24 40.8-0.4-12.5 8.1-31.5 8.1-31.5-6.3 2.9-30.1 16.5-30.1 16.5-11.6 9.7-15.3 35.1-15.3 35.1-2.2-10 5.5-29.3 5.5-29.3-33.5 19.3-57.5 52.2-57.5 52.2-16.6 32.6-2.9 58-8.1 51.9-5.2-6.1-4.1-28.3-4.1-28.3-35 33.6-38.7 49.7-38.7 49.7-5.9 14.3-11.1 52.6-11.1 52.6-3.3-3.6 0-23.6 0-23.6-8.5 17.9-4.4 34.7-4.4 34.7C34.3 240.4 33.2 215.4 33.2 215.4Z" id="logo-top"/><path d="m310 14.2c0 0-13.5 13.1-30.8 26.1C252.2 61.6 226.1 79.1 226.1 79.1 123.9 139.4 67 237.9 48.2 271.7l10 0c3.5-2.8 8.8-5 31-11.4 28-8.1 44.7-25 44.7-25 0 0-25.6 14.3-37.6 12.9-12-1.4-28.2 3.1-28.2 3.1 0 0-6.2-2.9 24.3-7.4 30.5-4.5 80.6-38.6 80.6-38.6 0 0-19.2 7.9-28 7.2-8.8-0.7-30.7 0-30.7 0 14.5-3.3 28-1.4 50.1-9.8 22.1-8.3 20.9-7.6 20.9-7.6 25.1-8.3 35.5-34.3 35.5-34.3-4.3 1.7-37.4 5.7-51.2 1.7-13.7-4.1-37.1 0-37.1 0 22.1-7.4 27-4.1 32.4-4.3 5.4-0.2 22.9 1.2 57.5-10.7 34.6-11.9 44.5-26.7 44.5-26.7l-23.4 3.1c15.3-2.6 32.5-12.7 32.5-12.7-10.6 2.9-27 4.3-27 4.3 19.4-4.3 30.2-10.3 30.2-10.3 18.2-13.8 22.4-34.3 22.4-34.3-25.8 8.8-46.2 4.8-46.2 4.8 35.4-2.4 45.2-11.4 50.1-13.6 4.9-2.1 6.9-11 6.9-11-17.9 6.4-38.1 7.5-38.1 7.5 21.9-3.4 40.7-14.5 40.7-14.5l0-11.1c-8.5 4.8-23.4 8.6-23.4 8.6l23.2-15c1.3-7.5-4.8-12.2-4.8-12.2z" id="logo-bottom"/><polygon points="23.6 290.6 37.4 296.1 39.9 290 26.1 284.5 " id="logo-polygon"/><path d="M177 285.5c-45.6 21.9-89.5 36.9-147.8 38.8-5.4 0.2-5.5 5.6 0 5.4 52.2-1.8 95.5-13 137.4-32.6 46.6-21.9 89.4-40.2 147.8-46.4 5.4-0.6 3.1-5.8-2.3-5.2C260.5 251.1 218.5 265.5 177 285.5z" id="logo-line"/></svg>
                <span className="h2 col-md-1 hidden-sm hidden-xs logo-text" style={{color: '#202020', paddingTop: 20, paddingRight:0}}>السجل</span>
              </Link>
            </div>
          </div>
          <div className="col-xs-1 pull-left" style={{paddingTop: 10}}>
            <OnlineStatus isOnline={this.props.isOnline}/>
          </div>
        </div>
        <div style={{paddingTop: 10, paddingBottom: 10}}>
          <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
        </div>
        {
          this.props.children || <Dashboard/>
        }
      </div>
    );
  }
}

module.exports = connect(
  state => ({
    isOnline: state.isOnline,
    user: state.user
  }),
  dispatch => ({ actions: bindActionCreators(routeActions, dispatch) })
)(App)
