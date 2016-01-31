import React from 'react'
import {Link} from 'react-router'

require('font-awesome-webpack')
const styles = {
  color: '#424242'
}

export const SpinCog = (props) =>
  <i className="fa fa-times fa-spin fa-2x"
    style={Object.assign({}, {color: '#428BCA'}, props.style)}>
  </i>

export const IconBool = (props) => {
  if(props.value)
    return (<i className='fa fa-check fa-2x' style={styles}></i>);
  else
    return (<i className='fa fa-times fa-2x' style={styles}></i>)
}

export const TextBool = (props) => {
  if(props.value)
    return (<span>نعم</span>);
  else
    return (<span>لا</span>)
}

export const UpdateLink = (props) =>
  <Link to={props.url} style={props.style} onClick={e => {if(props.disabled) e.preventDefault()}}>
    <i className='fa fa-pencil-square-o fa-2x'></i>
  </Link>

export const CancelLink = (props) =>
  <a onClick={(e) => { e.preventDefault(); props.handleCancel(props.id)}}
    style={props.style} href='cancel'>
    <i className='fa fa-times fa-2x'></i>
  </a>

export const DetailsLink = (props) =>
  <Link to={props.url} style={props.style} onClick={e => {if(props.disabled) e.preventDefault()}}>
    <i className='fa fa-eye fa-2x'></i>
  </Link>

export const CreateButton = (props) =>
  <Link className={'btn btn-primary' +' '+ props.kls} to={props.url}>
    <i className='fa fa-plus' style={{paddingLeft:5}}></i>
    {props.text}
  </Link>

export const DetailsButton = (props) =>
  <Link className={'btn btn-primary' +' '+ props.kls} to={props.url}
    style={props.style}>
    <i className='fa fa-pencil-square-o' style={{paddingLeft:5}}></i>
    {props.text}
  </Link>

export const ResetButton = (props) =>
  <button className='btn' disabled={props.disabled}
    onClick={props.onClick}>{props.text}
  </button>

export const SubmitButton = (props) =>
  <button className={'btn btn-primary'} style={props.style}
   disabled={props.disabled} onClick={props.onClick}>{props.text}
  </button>
