import React from 'react'
import {Link} from 'react-router'


class Departments extends React.Component {
  render(){
    return (
      <div><h3>List of Departments</h3>
        <ul>
            <li><Link to="/admin/departments/create">create department</Link></li>
            <li><Link to="/admin/departments/update">update department</Link></li>
            <li><Link to="/admin/departments/details">details department</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = Departments
