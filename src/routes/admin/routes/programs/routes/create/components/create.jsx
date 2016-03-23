import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { routeActions } from 'react-router-redux'

import { createProgram } from '../../../store/actions'
import { createValidator, validateId } from '~/utils/validate'
import programValidator from '../../../validation'
import InputElement from '~/components/inputElement'
import SelectElement from '~/components/selectElement'
import * as elements from '~/components/elements'

class Create extends Component {

  render(){
    return (
      <div>
        <h3>إضافة برنامج</h3>
        <br/>
        <ReduxForm faculties={this.props.faculties}
          ids={this.props.programs.map(p => p.id)}
           onSubmit={(e) => this.handleSubmit(e)} />
      </div>
    )
  }

  handleSubmit(program) {
    const {dispatch} = this.props;
    dispatch(createProgram(program));
    dispatch(routeActions.push('/admin/programs'));
  }
}

class CreateProgramForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    faculties: PropTypes.array.isRequired
  };

  render(){
    const {
      fields: {id, title, titleTr, facultyId, terms, creditHours},
      handleSubmit,
      resetForm,
      submitting,
      faculties
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <InputElement field={id} placeholder="أدخل الإختصار" label="الإختصار"
            help="أحرف أو أرقام أو أحرف و أرقام بالإنجليزية فقط و يجب أن يكون فريداً"/>
          <InputElement field={title} placeholder="أدخل إسم البرنامج" label="إسم البرنامج"/>
          <InputElement field={titleTr} placeholder="أدخل إسم البرنامج بالإنجليزية" label="الإسم بالإنجليزية"/>
          <InputElement field={terms} placeholder="أدخل أجمالي الفصول للبرنامج" label="عدد الفصول"/>
          <InputElement field={creditHours} placeholder="أدخل أجمالي الساعات للبرنامج" label="الساعات"/>
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
  form: 'createProgram',
  fields: ['id', 'title', 'titleTr', 'facultyId', 'terms', 'creditHours'],
  asyncValidate: validateId,
  asyncBlurFields: ['id'],
  validate: createValidator(programValidator)
  },
  () => ({
    initialValues: {id: '', title:'', titleTr:'', facultyId:'', terms:'', creditHours:''}
  })
)(CreateProgramForm);

module.exports = connect((state) => ({
  programs: state.programs,
  faculties: state.faculties,
  user: state.user}))(Create)
