import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { pushPath } from 'redux-simple-router'

import { createDepartment } from '../../../store/actions'
import { createValidator, validateId } from '~/utils/validate'
import departmentValidator from '../../../validation'
import InputElement from '~/components/inputElement'
import SelectElement from '~/components/selectElement'
import * as elements from '~/components/elements'

class Create extends Component {
  render(){
    return (
      <div>
        <h3>إضافة قسم</h3>
        <br/>
        <ReduxForm ids={this.props.departments.map(d => d.id)}
          faculties={this.props.faculties}
           onSubmit={(e) => this.handleSubmit(e)} />
      </div>
    )
  }

  handleSubmit(department) {
    const {dispatch} = this.props
    dispatch(createDepartment(department))
    dispatch(pushPath('/admin/departments'))
  }
}

class CreateDepartmentForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    faculties: PropTypes.array.isRequired
  }

  render(){
    const {
      fields: {id, title, titleTr, facultyId},
      handleSubmit,
      resetForm,
      submitting,
      faculties
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <InputElement field={id} placeholder="أدخل الإختصار" label="الإختصار"
            help="أحرف أو أرقام أو أحرف و أرقام بالإنجليزية فقط و يجب أن يكون فريداً"/>
          <InputElement field={title} placeholder="أدخل إسم القسم" label="إسم القسم"/>
          <InputElement field={titleTr} placeholder="أدخل الإسم بالإنجليزية" label="الإسم بالإنجليزية"/>
          <SelectElement field={facultyId} placeholder="إختر الكلية" label="الكلية"
            options={faculties.map(f => Object.create({id: f.id, text: f.title, isActive: f.isActive}) ) } />
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

let ReduxForm = reduxForm({
  form: 'createDepartment',
  fields: ['id', 'title', 'titleTr', 'facultyId'],
  asyncValidate: validateId,
  asyncBlurFields: ['id'],
  validate: createValidator(departmentValidator)
  }
)(CreateDepartmentForm)

module.exports = connect((state) => ({
    departments: state.departments,
    user: state.user,
    faculties: state.faculties
  }))(Create)
