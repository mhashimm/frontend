import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { routeActions } from 'react-router-redux'
import * as elements from '~/components/elements'

require('../../../../../../../styles/react-bootstrap-switch.css')
var Switch = require('react-bootstrap-switch')

import { createValidator } from '~/utils/validate'
import { updateCourse } from '../../../store/actions'
import courseValidator from '../../../validation'
import InputElement from '~/components/inputElement'
import SelectElement from '~/components/selectElement'
import TextElement from '~/components/textElement'

class Update extends Component {
  constructor(props){
    super(props)
    //props.facultyId = props.faculties.find(f => f.id === props.params.id).id
  }

  render(){
    const course = this.props.courses.find(c => c.id === this.props.params.id)
    return (
      <div>
        <h3>تعديل المقرر</h3>
        <ReduxForm onSubmit={(e) => this.handleSubmit(e)} faculties={this.props.faculties}
          departments={this.props.departments} initialValues={{...course}}/>
      </div>
    )
  }

  handleSubmit(course){
    const {dispatch} = this.props
    dispatch(updateCourse(course))
    dispatch(routeActions.push('/admin/courses'))
  }
}

class UpdateCourseForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    faculties: PropTypes.array.isRequired,
    departments: PropTypes.array.isRequired
  };

  render(){
    const {
      fields: {id, isActive, title, titleTr, facultyId, departmentId, remarks, isNew},
      handleSubmit,
      resetForm,
      submitting,
      faculties,
      departments
    } = this.props;

    return(
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          { this.props.isNew ? <input type="hidden" {...isNew}></input> : null}
          <InputElement label="الإختصار" isReadOnly field={id}/>
          <InputElement field={title} placeholder="أدخل إسم المقرر" label="إسم المقرر"/>
          <InputElement field={titleTr} placeholder="أدخل الإسم بالإنجليزية" label="الإسم بالإنجليزية"/>
          <SelectElement field={facultyId} placeholder="إختر الكلية" label="الكلية"
            options={faculties.map(f => Object.create({id: f.id, text: f.title, isActive: f.isActive}))} />
          <SelectElement field={departmentId} placeholder="إختر القسم" label="القسم"
            options={departments.filter(d => d.facultyId === this.props.values.facultyId)
              .map(d => Object.create({id: d.id, text: d.title, isActive: d.isActive}))} />
          <div className="form-group ">
            <div className="col-md-12 col-md-offset-2">
              <Switch className="" offText="لا" {...isActive} state={isActive.value} onText="نعم" labelText="نشط" />
            </div>
          </div>
          <TextElement field={remarks} label='ملحوظات'/>
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
  form: 'updateCourse',
  fields: ['id', 'isActive', 'title', 'titleTr', 'facultyId', 'departmentId', 'remarks', 'isNew'],
  validate: createValidator(courseValidator)
}
)(UpdateCourseForm);


module.exports = connect((state) => ({
  courses: state.courses,
  faculties: state.faculties,
  departments: state.departments
}))(Update)
