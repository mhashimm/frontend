
import React from 'react';
import { Router, Route, Link } from 'react-router'

export default class Dashboard extends React.Component {
  render() {
    return(
      <div className="callout secondary">
        <div className="row">
          <Port active={true} icon={require('../images/cogs.svg')} text='الاعدادت'/>
          <Port active={false} icon={require('../images/registration.svg')} text='التسجيل'/>
        </div>
      </div>);
  }
}

class Port extends React.Component {
  render(){
    if(this.props.active)
      return(
        <div className="medium-4 small-6 columns active-port">
          <Link  to="admin">
            <object type="image/svg+xml" data={this.props.icon}></object>
            <h3 class="text-center">{this.props.text}</h3>
          </Link>
        </div>);
    else
      return(
        <div  className="medium-4 small-6 columns inactive-port">
          <object type="image/svg+xml" data={this.props.icon}></object>
          <h3 class="text-center">{this.props.text}</h3>
        </div>);
  }
}
