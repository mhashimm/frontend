import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import * as elements from '~/components/Elements'
import { SUCCESS, FAILURE, PENDING } from '~/stores/status'
import { cancelFaculty } from '../store/actions'

const styles = {

}

class FacultiesComponent extends Component {
  render(){
    const {faculties} = this.props
    return (
      <div>
        {this.props.children ||
        (
          <div>
            <h3>قائمة الكليات</h3>
            <elements.CreateButton text="إضافة" kls="pull-left" url={`/admin/faculties/create`}/>
            <br/><br/>
            <FacultyTable faculties={faculties} handleCancel={ e => this.handleCancel(e)}/>
          </div>
        )}
      </div>
    );
  }

  handleCancel(id){
    this.props.dispatch(cancelFaculty(id))
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
          <FacultyRow {...faculty} key={faculty.id} handleCancel={props.handleCancel} />
        )}
      </tbody>
    </table>
  </div>;

var FacultyRow = (props) =>
  <tr className={getClass(props.status)}>
    <td>{props.id}</td>
    <td>{props.title}</td>
    <td>{props.titleTr}</td>
    <td>
      <elements.TextBool value={props.isActive}/>
    </td>
    <td>
      <elements.UpdateLink url={`/admin/faculties/update/${props.id}`}/>
      <elements.DetailsLink url={`/admin/faculties/details/${props.id}`} style={{paddingRight: 10}}/>
      {props.status === PENDING || props.status === FAILURE ?
        <elements.CancelLink handleCancel={props.handleCancel} id={props.id}/>
      : null }
    </td>
  </tr>;

function getClass(prop) {
  if(prop === PENDING) return 'warning'
  else if(prop === SUCCESS) return 'success'
  else if(prop === FAILURE) return 'danger'
  else return ''
}

module.exports = connect(state => ({faculties: state.faculties}))(FacultiesComponent)
