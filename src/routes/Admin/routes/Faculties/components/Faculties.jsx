import React from 'react'
import {Link} from 'react-router'


class Faculties extends React.Component {
  render(){
    return (
      <div><h3>List of Facultis</h3>
        { this.props.children || (
        <ul>
            <li><Link to="/admin/faculties/create">create faculty</Link></li>
            <li><Link to="/admin/faculties/update">update faculty</Link></li>
            <li><Link to="/admin/faculties/details">details faculty</Link></li>
        </ul>)}
      </div>
    );
  }
}

module.exports = Faculties
