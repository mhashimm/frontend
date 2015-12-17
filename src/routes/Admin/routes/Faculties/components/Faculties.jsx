import React from 'react'
import {Link} from 'react-router'

var Table = require('react-bootstrap').Table;
const table = (
  <div>
    <h3>قائمة الكليات</h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>الإختصار</th>
          <th>إسم الكلية</th>
          <th>الإسم بالإنجليزية</th>
          <th>نشطة</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>electronic</td>
          <td>كلية الهندسة الالكترونية</td>
          <td>Faculty of Electronic Engineering</td>
          <td>نعم</td>
        </tr>
        <tr>
          <td>law</td>
          <td>كلية القانون</td>
          <td>Faculty of Law</td>
          <td>لا</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

class Faculties extends React.Component {
  render(){
    return (
      <div>
        { this.props.children || (
        <div>
        <ul>
            <li><Link to="/admin/faculties/create">create faculty</Link></li>
            <li><Link to="/admin/faculties/update">update faculty</Link></li>
            <li><Link to="/admin/faculties/details">details faculty</Link></li>
        </ul>
        {table}
        </div>
      )}
      </div>
    );
  }
}



module.exports = Faculties
