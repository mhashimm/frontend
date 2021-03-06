import React from 'react'
import { Link } from 'react-router'

require('font-awesome-webpack')
const styles = {
  color: '#424242'
}

export const LoginStatus = (props) => {
  if(props.user.authenticated && !!props.user.token)
    return(
      <a href="/logout" onClick={e => {e.preventDefault(); props.handleLogout()}}
        className="icon-link" style={{outline: 'none'}}>
        <i className="fa fa-unlock fa-2x text-primary"></i>
      </a>
    )
  else if(props.user.authenticated && !props.user.token)
    return(
      <a href="/logout" onClick={e => {e.preventDefault(); props.handleLogout()}}
        className="icon-link" style={{outline: 'none'}}>
        <i className="fa fa-unlock fa-2x" style={{color: '#9c9c9c'}}></i>
      </a>
    )
  else {
    return(<i className="fa fa-lock fa-2x" style={{color: '#9c9c9c'}}></i>)
  }
}

export const OnlineStatus = (props) => props.isOnline
  ? <i className="fa fa-globe fa-2x text-primary"></i>
  : <i className="fa fa-globe fa-2x" style={{color: '#9c9c9c'}}></i>

export const SpinCog = (props) =>
  <i className="fa fa-times fa-spin fa-2x"
    style={Object.assign({}, {color: '#428BCA'}, props.style)}>
  </i>

export const IconBool = (props) => props.value
  ? <i className='fa fa-check fa-2x' style={styles}></i>
  : <i className='fa fa-times fa-2x' style={styles}></i>

export const TextBool = (props) => props.value ? <span>نعم</span> : <span>لا</span>

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
