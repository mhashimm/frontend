import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as elements from '~/components/elements'
import { SUCCESS, FAILURE, PENDING_ACTIVE, PENDING_IDLE } from '~/stores/status'
import { cancelFaculty, loadFaculties } from '../store/actions'

class FacultiesComponent extends Component {
  componentDidMount(){
    this.props.dispatch(loadFaculties())
  }

  render(){
    const {faculties} = this.props
    return (
      <div>
        {this.props.children ||
        (
          <div>
            <span className="h3">
              <i className="fa fa-bank"></i>
              <span style={{marginRight:5}}>قائمة الكليات</span>
            </span>
            <elements.CreateButton text="إضافة" kls="pull-left" url={`/admin/faculties/create`}/>
            <br/><br/>
            <FacultyTable faculties={faculties} handleCancel={ e => this.handleCancel(e)}/>
          </div>
        )
      }
    </div>
    );
  }

  handleCancel(id){
    this.props.dispatch(cancelFaculty(id))
  }
}

var FacultyTable = (props) =>
  <div>
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>الإختصار</th>
          <th>إسم الكلية</th>
          <th>الإسم بالإنجليزية</th>
          <th>نشطة</th>
          <th className="col-md-2"></th>
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
      <elements.UpdateLink url={`/admin/faculties/update/${props.id}`}
        disabled={props.status === PENDING_ACTIVE}/>
      <elements.DetailsLink url={`/admin/faculties/details/${props.id}`}
        style={{marginRight: 10}} disabled={props.status === PENDING_ACTIVE}/>
      { props.status === FAILURE || props.status === PENDING_IDLE ?
        <elements.CancelLink handleCancel={props.handleCancel} id={props.id} style={{marginRight: 10}}/>
      : null }
      { props.status === PENDING_ACTIVE ? <elements.SpinCog style={{marginRight: 10}}/> : null }
    </td>
  </tr>;

function getClass(prop) {
  if(prop === PENDING_IDLE || prop === PENDING_ACTIVE) return 'warning'
  else if(prop === SUCCESS) return 'success'
  else if(prop === FAILURE) return 'danger'
  else return ''
}

module.exports = connect(state => ({faculties: state.faculties}))(FacultiesComponent)
