import React from 'react'
import {Link} from 'react-router'


class Programs extends React.Component {
  render(){
    return (
      <div><h3>List of Program</h3>
        <ul>
            <li><Link to="/admin/programs/create">create program</Link></li>
            <li><Link to="/admin/programs/update">update program</Link></li>
            <li><Link to="/admin/programs/details">details program</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = Programs
