import React, {Component, PropTypes} from 'react'

const helpStyle = {
  fontSize: 12
}

export default class InputElement extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
    placeholder: PropTypes.string
  };

  render(){
    return(
      <div>
        {(this.props.field.touched && this.props.field.error)
        ?
          (<div className="form-group has-error">
            <label className="col-md-2 control-label text-danger">{this.props.label}</label>
            <div className="col-md-7">
              <input className="form-control" type="text" {...this.props.field}
                placeholder={this.props.placeholder}
                aria-describedby={this.props.field.name + '-help-block'}></input>
              <span id={this.props.field.name + '-help-block'} style={helpStyle} className="help-block">{this.props.help}</span>
            </div>
          <label className="col-md-3 text-danger">{this.props.field.error}</label>
          </div>)
        :
          (<div className="form-group">
            <label className="col-md-2 control-label">{this.props.label}</label>
            <div className="col-md-10">
              {this.props.isReadOnly ?
                <input className="form-control" readOnly type="text" {...this.props.field}
                  placeholder={this.props.placeholder}
                  aria-describedby={this.props.field.name + '-help-block'}></input>
                :
                <input className="form-control" type="text" {...this.props.field}
                  placeholder={this.props.placeholder}
                  aria-describedby={this.props.field.name + '-help-block'}></input>
              }
              <span id={this.props.field.name + '-help-block'} style={helpStyle} className="help-block">{this.props.help}</span>
            </div>
          </div>)}
      </div>
    )
  }
}
