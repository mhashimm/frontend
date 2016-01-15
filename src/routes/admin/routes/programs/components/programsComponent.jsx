import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as elements from '~/components/elements'
import { SUCCESS, FAILURE, PENDING } from '~/stores/status'
import { cancelProgram, loadPrograms } from '../store/actions'

class ProgramsComponent extends Component {
  componentDidMount(){
    this.props.dispatch(loadPrograms())
  }

  render(){
    const {programs} = this.props
    return (
      <div>
        {this.props.children ||
        (
          <div>
            <span className="h3">
              <i className="fa fa-graduation-cap"></i>
              <span style={{marginRight:5}}>قائمة البرامج</span>
            </span>
            <elements.CreateButton text="إضافة" kls="pull-left" url={`/admin/programs/create`}/>
            <br/><br/>
            <ProgramTable programs={programs} handleCancel={ e => this.handleCancel(e)}/>
          </div>
        )
      }
    </div>
    );
  }

  handleCancel(id){
    this.props.dispatch(cancelProgram(id))
  }
}

var ProgramTable = (props) =>
  <div>
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>الإختصار</th>
          <th>إسم البرنامج</th>
          <th>الإسم بالإنجليزية</th>
          <th>نشط</th>
          <th className="col-md-2"></th>
        </tr>
      </thead>
      <tbody>
        {props.programs.map((program) =>
          <ProgramRow {...program} key={program.id} handleCancel={props.handleCancel} />
        )}
      </tbody>
    </table>
  </div>;

var ProgramRow = (props) =>
  <tr className={getClass(props.status)}>
    <td>{props.id}</td>
    <td>{props.title}</td>
    <td>{props.titleTr}</td>
    <td>
      <elements.TextBool value={props.isActive}/>
    </td>
    <td>
      <elements.UpdateLink url={`/admin/programs/update/${props.id}`}
        disabled={props.status === PENDING}/>
      <elements.DetailsLink url={`/admin/programs/details/${props.id}`}
        style={{marginRight: 10}} disabled={props.status === PENDING}/>
      { props.status === FAILURE ?
        <elements.CancelLink handleCancel={props.handleCancel} id={props.id} style={{marginRight: 10}}/>
      : null }
      { props.status === PENDING ? <elements.SpinCog style={{marginRight: 10}}/> : null }
    </td>
  </tr>;

function getClass(prop) {
  if(prop === PENDING) return 'warning'
  else if(prop === SUCCESS) return 'success'
  else if(prop === FAILURE) return 'danger'
  else return ''
}

module.exports = connect(state => ({programs: state.programs}))(ProgramsComponent)
