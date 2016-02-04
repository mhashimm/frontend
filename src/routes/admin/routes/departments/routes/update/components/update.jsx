import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { routeActions } from 'redux-simple-router'
import * as elements from '~/components/elements'

require('../../../../../../../styles/react-bootstrap-switch.css')
var Switch = require('react-bootstrap-switch')

import { createValidator } from '~/utils/validate'
import { updateDepartment } from '../../../store/actions'
import departmentValidator from '../../../validation'
import InputElement from '~/components/inputElement'
import SelectElement from '~/components/selectElement'

class Update extends Component {
  render(){
    const department = this.props.departments.find(d => d.id === this.props.params.id)
    return (
      <div>
        <h3>تعديل القسم</h3>
        <ReduxForm onSubmit={(e) => this.handleSubmit(e)}
          faculties={this.props.faculties}
          switchValue={department.isActive} initialValues={{...department}}/>
      </div>
    )
  }

  handleSubmit(department){
    const {dispatch} = this.props
    dispatch(updateDepartment(department))
    dispatch(routeActions.push('/admin/departments'))
  }
}

class UpdateDepartmentForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    faculties: PropTypes.array.isRequired
  };

  render(){
    const {
      fields: {id, isActive, title, titleTr, facultyId, isNew},
      handleSubmit,
      resetForm,
      submitting,
      faculties
    } = this.props

    return(
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <InputElement field={id} isReadOnly={true} label='الإختصار'/>
          { this.props.isNew ? <input type="hidden" {...isNew}></input> : null}
          <InputElement field={title} placeholder="أدخل إسم القسم" label="إسم القسم"/>
          <InputElement field={titleTr} placeholder="أدخل الإسم بالإنجليزية" label="الإسم بالإنجليزية"/>
          <SelectElement field={facultyId} placeholder="إختر الكلية" label="الكلية"
            options={faculties.map(f => Object.create({id: f.id, text: f.title, isActive: f.isActive}) ) } />
          <div className="form-group ">
            <div className="col-md-12 col-md-offset-2">
              <Switch className="" offText="لا" {...isActive} state={this.props.switchValue} onText="نعم" labelText="نشط" />
            </div>
        </div>
        <br/>
          <div className="form-group">
            <div className="col-md-12 col-md-offset-2">
            <elements.ResetButton disabled={submitting} onClick={resetForm} text="إسترجاع"/>
            <elements.SubmitButton disabled={submitting} onClick={handleSubmit} text="حفظ" style={{marginRight: 10}}/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const ReduxForm = reduxForm({
  form: 'updateDepartment',
  fields: ['id', 'isActive', 'title', 'titleTr', 'facultyId', 'isNew'],
  validate: createValidator(departmentValidator)
}
)(UpdateDepartmentForm)


module.exports = connect((state) => ({
  departments: state.departments,
  faculties: state.faculties
}))(Update)
