import React from 'react'
import {Link} from 'react-router'


class Faculties extends React.Component {
  render(){
    return (
      <div><h3>List of Facultis</h3>
        <ul>
            <li><Link to="/admin/faculties/create">create faculty</Link></li>
            <li><Link to="/admin/faculties/update">update faculty</Link></li>
            <li><Link to="/admin/faculties/details">details faculty</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = Faculties
