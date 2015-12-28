import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { IconBool } from '~/components/Elements'

const styles = {

}

class FacultiesComponent extends Component {
  render(){
    window.console.log(this.props)
    const {faculties} = this.props
    return (
      <div>
        {this.props.children ||
        (
          <div>
            <h3>قائمة الكليات</h3>
            <Link className="btn btn-primary pull-left" to={`/admin/faculties/create`}>
              <i className="fa fa-plus" style={{paddingLeft:5}}></i>
              إضافة
              <FacultyTable faculties={faculties}/>
            </Link>
            <br/><br/>
          </div>
        )}
      </div>
    );
  }
}

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
    <td>
      <IconBool value={props.isActive}/>
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

module.exports = connect(state => ({faculties: state.faculties}))(FacultiesComponent)
