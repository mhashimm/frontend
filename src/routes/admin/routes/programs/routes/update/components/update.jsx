import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { routeActions } from 'redux-simple-router'
import * as elements from '~/components/elements'

require('../../../../../../../styles/react-bootstrap-switch.css')
var Switch = require('react-bootstrap-switch')

import { createValidator } from '~/utils/validate'
import { updateProgram } from '../../../store/actions'
import programValidator from '../../../validation'
import InputElement from '~/components/inputElement'
import SelectElement from '~/components/selectElement'

class Update extends Component {
  render(){
    const program = this.props.programs.find(f => f.id === this.props.params.id)
    return (
      <div>
        <h3>تعديل البرنامج</h3>
        <ReduxForm onSubmit={(e) => this.handleSubmit(e)} faculties={this.props.faculties}
          switchValue={program.isActive} initialValues={{...program}}/>
      </div>
    )
  }

  handleSubmit(program){
    const {dispatch} = this.props
    dispatch(updateProgram(program))
    dispatch(routeActions.push('/admin/programs'))
  }
}

class UpdateProgramForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    faculties: PropTypes.array.isRequired
  };

  render(){
    const {
      fields: {id, isActive, title, titleTr, terms, creditHours, facultyId, isNew},
      handleSubmit,
      resetForm,
      submitting,
      faculties
    } = this.props

    return(
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          { this.props.isNew ? <input type="hidden" {...isNew}></input> : null}
          <InputElement field={id} label="الإختصار" isReadOnly={true}/>
          <InputElement field={title} placeholder="أدخل إسم البرنامج" label="إسم البرنامج"/>
          <InputElement field={titleTr} placeholder="أدخل الإسم بالإنجليزية" label="الإسم بالإنجليزية"/>
          <InputElement field={terms} placeholder="أدخل أجمالي الفصول للبرنامج" label="عدد الفصول"/>
          <InputElement field={creditHours} placeholder="أدخل أجمالي الساعات للبرنامج" label="الساعات"/>
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
  form: 'updateProgram',
  fields: ['id', 'isActive', 'title', 'titleTr', 'terms', 'creditHours', 'facultyId', 'isNew'],
  validate: createValidator(programValidator)
}
)(UpdateProgramForm);


module.exports = connect((state) => ({
  programs: state.programs,
  faculties: state.faculties
}))(Update)
