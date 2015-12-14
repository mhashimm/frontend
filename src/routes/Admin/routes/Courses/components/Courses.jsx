import React from 'react'
import {Link} from 'react-router'


class Courses extends React.Component {
  render(){
    return (
      <div><h3>List of Courses</h3>
        <ul>
            <li><Link to="/admin/courses/create">create course</Link></li>
            <li><Link to="/admin/courses/update">update course</Link></li>
            <li><Link to="/admin/courses/details">details course</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = Courses
