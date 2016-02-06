import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Breadcrumbs from 'react-breadcrumbs'
import Dashboard from './dashboard'
import * as actionCreators from '../stores/login/actions'

require('../styles/style.css')

class App extends Component {
  componentWillMount(){
    this.props.actions.login()
  }

  render() {
    return (
      <div className='container'>
        <div className="row" style={{height: 100}}>
          <div className="col-xs-2 logo">
            <div className="row">
              <Link to="/">
                <svg className="col-md-6" style={{height: 80, width: 100}} viewBox="0 0 331.331 331.331" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"><path d="M30.421 317.462l4.422-17.661 -12.194-4.814 -8.376 13.804c0 0 4.618 12.526-0.511 22.539C13.766 331.331 20.184 320.399 30.421 317.462zM22.229 309.358c1.501-0.615 3.231 0.087 3.851 1.561 0.625 1.474-0.087 3.171-1.588 3.786 -1.501 0.615-3.231-0.087-3.851-1.561C20.01 311.664 20.723 309.967 22.229 309.358zM158.353 112.621c-35.115 28.8-81.086 88.124-120.073 157.423l-0.022-0.027 -6.815 12.026 7.267 2.796 3.84-10.117c20.799-37.491 77.224-135.4 180.397-200.451 0 0 38.411-22.877 76.256-54.516 -9.214 7.702-27.391 17.356-37.247 23.584C236.088 59.683 204.166 75.043 158.353 112.621zM33.2 215.365c-7.985 28.223-7.528 49.718-4.438 55.625h4.83c13.337-27.625 77.572-127.693 117.554-159.016 41.424-32.455 73.378-51.339 100.253-65.111 9.437-4.835 19.118-11.384 27.848-17.949 10.601-8.36 21.348-17.302 30.758-26.053L282.728 20.75 294.89 2.148 271.67 25.759 286.78 0c-35.746 3.225-68.918 21.109-68.918 21.109 -13.271 15.741-23.959 40.782-23.959 40.782 -0.37-12.521 8.11-31.481 8.11-31.481 -6.266 2.861-30.073 16.459-30.073 16.459 -11.645 9.66-15.262 35.06-15.262 35.06 -2.214-10.019 5.526-29.333 5.526-29.333 -33.543 19.32-57.502 52.231-57.502 52.231 -16.584 32.553-2.948 57.953-8.11 51.872 -5.162-6.081-4.052-28.261-4.052-28.261 -35.017 33.63-38.699 49.724-38.699 49.724 -5.896 14.31-11.058 52.59-11.058 52.59 -3.318-3.579 0-23.611 0-23.611 -8.479 17.889-4.422 34.701-4.422 34.701C34.309 240.407 33.2 215.365 33.2 215.365zM310.01 14.191c0 0-13.483 13.065-30.758 26.053 -27.081 21.359-53.156 38.819-53.156 38.819C123.945 139.425 67.025 237.932 48.212 271.708h10.002c3.535-2.834 8.844-4.971 31.014-11.389 28.011-8.11 44.72-25.041 44.72-25.041s-25.553 14.31-37.595 12.88 -28.223 3.1-28.223 3.1 -6.179-2.861 24.291-7.392 80.596-38.634 80.596-38.634 -19.167 7.87-28.011 7.152c-8.844-0.718-30.714 0-30.714 0 14.495-3.34 28.011-1.43 50.126-9.779 22.115-8.349 20.886-7.631 20.886-7.631 25.063-8.349 35.474-34.342 35.474-34.342 -4.335 1.67-37.443 5.722-51.176 1.67 -13.734-4.052-37.132 0-37.132 0 22.115-7.392 27.032-4.052 32.433-4.291 5.406-0.239 22.855 1.191 57.502-10.731s44.475-26.711 44.475-26.711l-23.366 3.122c15.257-2.567 32.455-12.662 32.455-12.662 -10.568 2.861-27.032 4.291-27.032 4.291 19.412-4.291 30.225-10.253 30.225-10.253 18.183-13.832 22.36-34.342 22.36-34.342 -25.803 8.822-46.194 4.77-46.194 4.77 35.387-2.382 45.215-11.449 50.126-13.592 4.917-2.148 6.94-11.03 6.94-11.03 -17.878 6.44-38.15 7.511-38.15 7.511 21.93-3.399 40.722-14.49 40.722-14.49V32.792c-8.479 4.83-23.399 8.588-23.399 8.588l23.219-15.023C316.091 18.841 310.01 14.191 310.01 14.191z"></path><polygon points="23.551 290.571 37.361 296.103 39.933 289.989 26.124 284.458 "></polygon><path className="line" d="M177.036 285.458c-45.628 21.936-89.462 36.888-147.758 38.846 -5.439 0.185-5.466 5.624 0 5.439 52.15-1.751 95.543-12.961 137.391-32.575 46.618-21.854 89.435-40.167 147.828-46.39 5.385-0.577 3.095-5.814-2.252-5.243C260.531 251.051 218.514 265.519 177.036 285.458z"></path></svg>
                <span className="h2 col-md-1 hidden-sm hidden-xs logo-text" style={{color: '#202020', paddingTop: 20, paddingRight:0}}>السجل</span>
              </Link>
            </div>
          </div>
          <div className="col-xs-1 pull-left" style={{paddingTop: 10}}>
            { this.props.isOnline ? <i className="fa fa-globe fa-2x text-primary"></i>
              : <i className="fa fa-globe fa-2x" style={{color: '#9c9c9c'}}></i>
            }
          </div>
        </div>
        <div style={{paddingTop: 10, paddingBottom: 10}}>
          <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
        </div>
        { this.props.children || <Dashboard /> }
      </div>
    );
  }
}

module.exports = connect(
  state => ({
    isOnline: state.isOnline,
    user: state.user
  }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) })
)(App)
