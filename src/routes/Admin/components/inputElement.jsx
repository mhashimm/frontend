import React, {Component, PropTypes} from 'react';

export default class InputElement extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  render(){
    return(
      <div>
        {(this.props.field.touched && this.props.field.error) ?
          (<div className="form-group has-error">
            <label className="col-md-2 control-label text-danger">{this.props.label}</label>
            <div className="col-md-7">
            <input className="form-control" type="text" {...this.props.field} placeholder={this.props.placeholder}></input>
            </div>
          <label className="col-md-3 text-danger">{this.props.field.error}</label>
          </div>)
        :
        (<div className="form-group">
          <label className="col-md-2 control-label">{this.props.label}</label>
          <div className="col-md-10">
            <input className="form-control" type="text" {...this.props.field} placeholder={this.props.placeholder}></input>
          </div>
        </div>)}
      </div>
    )
  }
}
