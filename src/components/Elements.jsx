import React from 'react'

require('font-awesome-webpack')
const styles = {

}

export const IconBool = (props) => {
  if(props.value)
    return (<i className="fa fa-check fa-2x" style={styles}></i>);
  else
    return (<i className="fa fa-times fa-2x" style={styles}></i>)
}

export const TextBool = (props) => {
  if(props.value)
    return (<span>نعم</span>);
  else
    return (<span>لا</span>)
}
