import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { createValidator } from '~/utils/validate'
import loginValidator from '../validation'
import * as actionCreators from '../store/actions'
import InputElement from '~/components/inputElement'
import * as elements from '~/components/elements'

require('../../../styles/react-bootstrap-switch.css')
var Switch = require('react-bootstrap-switch')

class Login extends Component {
  componentDidMount(){
    //this.props.actions.login()
  }

  render(){
    return(
      <div>
        <h3>تسجيل الدخول</h3>
        <br/>
        <ReduxForm onSubmit={(e) => this.handleSubmit(e)}
          initialValues={{username: '', password: '', passwordConfirm: '', isNew: false}}/>
      </div>
    )
  }

  handleSubmit(e){
    console.log(e)
  }
}

class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render(){
    const {
      fields: {username, password, passwordConfirm, isNew},
      error,
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <InputElement field={username} placeholder="أدخل إسم المستخدم" label="الإسم"/>
        <InputElement field={password} type='password' placeholder="أدخل كلمة السر" label="كلمة السر"/>
        { isNew.value ?
          <InputElement field={passwordConfirm} type='password' placeholder="أدخل كلمة السر مرة إخرى" label="تأكيد كلمة السر"/>
          : null
        }
        <div className="form-group">
          <div className="col-md-12 col-md-offset-2">
            <Switch className="" offText="دخول" {...isNew} state={isNew.value} onText="تسجيل" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12 col-md-offset-2">
            <elements.ResetButton disabled={submitting} onClick={resetForm} text="إسترجاع"/>
            <elements.SubmitButton disabled={submitting} onClick={handleSubmit} text="حفظ" style={{marginRight: 10}}/>
          </div>
        </div>
      </form>
    )
  }
}

let ReduxForm = reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password', 'passwordConfirm', 'isNew'],
  validate: createValidator(loginValidator)
  }
)(LoginForm);

module.exports = connect(
  state => ({
    isOnline: state.isOnline,
    user: state.user
  }),
  dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) })
)(Login)
