import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import { pushPath } from 'redux-simple-router';

import { facultyCreated } from '../../../store/actions';
import { createValidator } from '~/utils/validate';
import facultyValidator from '../../../validation';
import InputElement from '~/components/InputElement'

class Create extends React.Component {
  render(){
    return (
      <div>
        <h3>إضافة كلية</h3>
        <br/>
        <ReduxForm onSubmit={(e) => this.handleSubmit(e)} />
      </div>
    )
  }

  handleSubmit(faculty) {
    const {dispatch} = this.props;
    dispatch(facultyCreated(faculty));
    dispatch(pushPath('/admin/faculties'));
  }
}

class CreateFacultyForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render(){
    const {
      fields: {id, title, titleTr},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <InputElement field={id} placeholder="أدخل الإختصار" label="الإختصار"
            help="أحرف أو أرقام أو أحرف و أرقام بالإنجليزية فقط و يجب أن يكون فريداً"/>
          <InputElement field={title} placeholder="أدخل إسم الكلية" label="إسم الكلية"/>
          <InputElement field={titleTr} placeholder="أدخل إسم الكلية بالإنجليزية" label="الإسم بالإنجليزية"/>
          <div className="form-group">
            <div className="col-md-12 col-md-offset-2">
              <button className="btn" disabled={submitting} onClick={resetForm}>إسترجاع</button>
              <button style={{marginRight: 10}} className="btn btn-primary" disabled={submitting} onClick={handleSubmit}>حفظ</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

let ReduxForm = reduxForm({
  form: 'createFaculty',
  fields: ['id', 'title', 'titleTr'],
  validate: createValidator(facultyValidator)
  },
  () => ({
    initialValues: {id: '', title:'', titleTr:''}
  })
)(CreateFacultyForm);

module.exports = connect((state) => ({faculties: state.faculties}))(Create)
