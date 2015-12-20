import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

import { createFaculty, updateFaculty} from '../../../../../../../stores/admin/actionCreators'

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

class Create extends React.Component {

  render(){
    return (
      <div>
        <h3>إضافة كلية</h3>
        <form>
          <Input type="text" ref="title" label="إسم الكلية" placeholder="إسم الكلية"/>
          <Input type="text" ref="titleTr" label="الإسم بالإنجليزية" placeholder="الإسم بالإنجليزية"/>
          <Input type="text" ref="id" label="الإختصار" placeholder="أدخل الإختصار هنا" help="* يستخدم في تعريف الكلية, يمكن أن يتكون من احرف أو أرقام إنجليزية" />
          <ButtonToolbar>
            <Button  type="reset">إلغاء</Button>
            <Button bsStyle="primary" type="submit" onClick={(e) => this.handleSave(e)}>حفظ</Button>
          </ButtonToolbar>
        </form>
      </div>
    )
  }

  handleSave(e) {
    e.preventDefault();
    const {dispatch} = this.props
    alert(Object.keys(ReactDOM.findDOMNode(this.refs.title)).map(e=>e))
    dispatch(createFaculty({
      title: ReactDOM.findDOMNode(this.refs.title).value,
      titleTr: ReactDOM.findDOMNode(this.refs.titleTr).value,
      id: ReactDOM.findDOMNode(this.refs.id).value
    }))
  }
}

function select(state) {
    return {faculties: state.facultyReducers}
}

module.exports = connect(select)(Create)
