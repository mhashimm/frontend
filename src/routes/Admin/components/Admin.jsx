import React from 'react';
import {Link} from 'react-router'

class Admin extends React.Component {
  render() {
    return(
      <div>
        <ul>
        <li><Link to='/admin/faculties'>faculties</Link></li>
        <li><Link to='/admin/departments'>departments</Link></li>
        <li><Link to='/admin/courses'>courses</Link></li>
        <li><Link to='/admin/programs'>programs</Link></li>
        </ul>
      <div>{this.props.children}</div>
      </div>
    );
  }
}

module.exports = Admin
