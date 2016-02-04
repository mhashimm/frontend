import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { routeActions } from 'redux-simple-router'

import { createCourse } from '../../../store/actions'
import { createValidator, validateId } from '~/utils/validate'
import courseValidator from '../../../validation'
import InputElement from '~/components/inputElement'
import SelectElement from '~/components/selectElement'
import TextElement from '~/components/textElement'
import * as elements from '~/components/elements'

class Create extends Component {
  render(){
    return (
      <div>
        <h3>إضافة مقرر</h3>
        <br/>
        <ReduxForm ids={this.props.courses.map(c => c.id)} faculties={this.props.faculties}
          departments={this.props.departments} onSubmit={(e) => this.handleSubmit(e)} />
      </div>
    )
  }

  handleSubmit(course) {
    const {dispatch} = this.props;
    dispatch(createCourse(course));
    dispatch(routeActions.push('/admin/courses'));
  }
}

class CreateCourseForm extends React.Component {
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
      fields: {id, title, titleTr, departmentId, facultyId, remarks},
      handleSubmit,
      resetForm,
      submitting,
      faculties,
      departments
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <InputElement field={id} placeholder="أدخل الإختصار" label="الإختصار"
            help="أحرف أو أرقام أو أحرف و أرقام بالإنجليزية فقط و يجب أن يكون فريداً"/>
          <InputElement field={title} placeholder="أدخل إسم المقرر" label="إسم المقرر"/>
          <InputElement field={titleTr} placeholder="أدخل إسم المقرر بالإنجليزية" label="الإسم بالإنجليزية"/>
          <SelectElement field={facultyId} placeholder="إختر الكلية" label="الكلية"
            options={faculties.map(f => Object.create({id: f.id, text: f.title, isActive: f.isActive}) ) } />
          <SelectElement field={departmentId} placeholder="إختر القسم" label="القسم"
            options={departments.filter(d => d.facultyId === this.props.values.facultyId)
              .map(d => Object.create({id: d.id, text: d.title, isActive: d.isActive}) ) } />
          <TextElement rows={6} field={remarks} label='ملحوظات'/>
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
  form: 'createCourse',
  fields: ['id', 'title', 'titleTr', 'departmentId', 'facultyId', 'remarks'],
  asyncValidate: validateId,
  asyncBlurFields: ['id'],
  validate: createValidator(courseValidator)
  },
  () => ({
    initialValues: {id: '', title:'', titleTr:'', departmentId:'', facultyId:'', remarks:''}
  })
)(CreateCourseForm);

module.exports = connect((state) =>
  ({
    courses: state.courses,
    user: state.user,
    faculties: state.faculties,
    departments: state.departments
}))(Create)
