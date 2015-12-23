import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import { pushPath } from 'redux-simple-router';

import { createFaculty } from '~/stores/admin/actionCreators';
import { createValidator } from '~/utils/validate';
import facultyValidator from '../../../validation';

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
    dispatch(createFaculty(faculty));
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
            {(title.touched && title.error) ?
              (<div className="form-group has-error">
                <label className="col-md-2 control-label text-danger">إسم الكلية</label>
                <div className="col-md-7">
                <input className="form-control" type="text" {...title} placeholder="إسم الكلية"></input>
                </div>
              <label className="col-md-3 text-danger" >{title.error}</label>
              </div>)
            :
            (<div className="form-group">
              <label className="col-md-2 control-label">إسم الكلية</label>
              <div className="col-md-10">
                <input className="form-control" type="text" {...title} placeholder="إسم الكلية"></input>
              </div>
            </div>)
            }

            {(titleTr.touched && titleTr.error) ?
              (<div className="form-group has-error">
                <label className="col-md-2 control-label text-danger">الإسم بالإنجليزية</label>
                <div className="col-md-7">
                <input className="form-control" type="text" {...titleTr} placeholder="الإسم بالإنجليزية"></input>
                </div>
              <label className="col-md-3 text-danger vcenter" >{titleTr.error}</label>
              </div>)
            :
            (<div className="form-group">
              <label className="col-md-2 control-label">الإسم بالإنجليزية</label>
              <div className="col-md-10">
                <input className="form-control" type="text" {...titleTr} placeholder="الإسم بالإنجليزية"></input>
              </div>
            </div>)
            }

            {(id.touched && id.error) ?
              (<div className="form-group has-error">
                <label className="col-md-2 control-label text-danger">الإختصار</label>
                <div className="col-md-7">
                <input className="form-control" type="text" {...id} placeholder="الإختصار"></input>
                </div>
              <label className="col-md-3 text-danger" >{id.error}</label>
              </div>)
            :
            (<div className="form-group">
              <label className="col-md-2 control-label">الإختصار</label>
              <div className="col-md-10">
                <input className="form-control" type="text" {...id} placeholder="الإختصار"></input>
              </div>
            </div>)
            }

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
  state => ({
    initialValues: {id: '', title:'', titleTr:''}
  })
)(CreateFacultyForm);

module.exports = connect((state) => ({faculties: state.facultyReducers}))(Create)
