import React from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

require('font-awesome-webpack')

class FacultiesComponent extends React.Component {


  render(){
    const {dispatch, faculties} = this.props
    return (
      <div>
        {this.props.children ||
        (
          <div>
            <h3>قائمة الكليات</h3>
            <Link className="btn btn-default pull-left" to={`/admin/faculties/create`}>
              <i className="fa fa-plus" style={{paddingLeft:5}}></i>
              إضافة كلية
            </Link>
            <br/><br/>
            <FacultyTable faculties={faculties}/>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  color: '#3C3C3C'
}

const stylesLast = { paddingRight: 10}

var FacultyTable = (props) =>
  <div>
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>الإختصار</th>
          <th>إسم الكلية</th>
          <th>الإسم بالإنجليزية</th>
          <th>نشطة</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.faculties.map((faculty) =>
          <FacultyRow {...faculty} key={faculty.id} />
        )}
      </tbody>
    </table>
  </div>;

var FacultyRow = (props) =>
  <tr>
    <td>{props.id}</td>
    <td>{props.title}</td>
    <td>{props.titleTr}</td>
    <td>{props.active
        ?
        <i className="fa fa-check fa-2x" style={styles}></i>
        :
        <i className="fa fa-times fa-2x" style={styles}></i>}
    </td>
    <td>
      <Link to={`/admin/faculties/update/${props.id}`} style={styles}>
        <i className="fa fa-pencil-square-o fa-2x"></i>
      </Link>
      <Link to={`/admin/faculties/details/${props.id}`} style={Object.assign(styles, { paddingRight: 10})}>
        <i className="fa fa-eye fa-2x"></i>
      </Link>
    </td>
  </tr>;


function select(state) {
    return {faculties: state.facultyReducers}
}

module.exports = connect(select)(FacultiesComponent)
