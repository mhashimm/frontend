import React from 'react'

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
require('jquery');
require('../../../../../../../styles/react-bootstrap-switch.css');
var Switch = require('react-bootstrap-switch');

class Update extends React.Component {
  render(){
    return (
      <div>
        <h3>تعديل الكلية</h3>
        <br/>
        <form>
          <Input type="text" label="إسم الكلية" placeholder="إسم الكلية"/>
          <Input type="text" label="الإسم بالإنجليزية" placeholder="الإسم بالإنجليزية"/>
          <Switch offText="لا" onText="نعم" labelText="نشطة" />
          <br/><br/>
          <ButtonToolbar>
            <Button  type="reset">إلغاء</Button>
            <Button bsStyle="primary" type="submit">حفظ</Button>
          </ButtonToolbar>
        </form>
      </div>
    )
  }
}

module.exports = Update
