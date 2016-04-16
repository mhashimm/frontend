import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { createValidator } from '~/utils/validate'
import loginValidator, {validatePassword} from '../validation'
import * as actionCreators from '../store/actions'
import InputElement from '~/components/inputElement'
import * as elements from '~/components/elements'

require('../../../styles/react-bootstrap-switch.css')

class Login extends Component {
  render(){
    return(
      <div>
        <h3>تسجيل الدخول</h3>
        <br/>
        <ReduxForm onSubmit={(e) => this.handleSubmit(e)}
          initialValues={{username: '', password: '', isNew: false}}/>
      </div>
    )
  }

  handleSubmit(e){
    this.props.actions.login(e)
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
      fields: {username, password, isNew},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <InputElement field={username} placeholder="أدخل إسم المستخدم" label="الإسم"/>
        <InputElement field={password} type='password' placeholder="أدخل كلمة المرور" label="كلمة المرور"/>
        <div className="form-group">
          <div className="col-md-12 col-md-offset-2">
            <elements.ResetButton disabled={submitting} onClick={resetForm} text="إسترجاع"/>
            <elements.SubmitButton disabled={submitting} onClick={handleSubmit} text={isNew.value ? 'تسجيل' : 'دخول'}
              style={{marginRight: 10}}/>
          </div>
        </div>
      </form>
    )
  }
}

let ReduxForm = reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password', 'isNew'],
  asyncValidate: validatePassword,
  asyncBlurFields: ['username'],
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
