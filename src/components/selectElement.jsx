import React, {Component, PropTypes} from 'react';

const helpStyle = {
  fontSize: 12
}

export default class SelectElement extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })).isRequired
  }

  render(){
    return(
      <div>
        {(this.props.field.touched && this.props.field.error)
        ?
          (<div className="form-group has-error">
            <label className="col-md-2 control-label text-danger">{this.props.label}</label>
            <div className="col-md-7">
              <select className="form-control" {...this.props.field} defaultValue="">
                <option key="default" value="" disabled>{this.props.placeholder}</option>
                {this.props.options.map(o => {
                  if(o.isActive) return(<option key={o.id} value={o.id}>{o.text}</option>)
                  else return(<option key={o.id} disabled value={o.id} className="text-danger">{o.text}</option>)
                  })
                }
              </select>
              <span id={this.props.field.name + '-help-block'} style={helpStyle} className="help-block">{this.props.help}</span>
            </div>
          <label className="col-md-3 text-danger">{this.props.field.error}</label>
          </div>)
        :
          (<div className="form-group">
            <label className="col-md-2 control-label">{this.props.label}</label>
            <div className="col-md-10">
              <select className="form-control" {...this.props.field} defaultValue="">
                <option key="default" value="" disabled>{this.props.placeholder}</option>
                {this.props.options.map(o => {
                  if(o.isActive) return(<option key={o.id} value={o.id}>{o.text}</option>)
                  else return(<option key={o.id} disabled value={o.id} className='text-danger'>{o.text}</option>)
                  })
                }
              </select>
              <span id={this.props.field.name + '-help-block'} style={helpStyle} className="help-block">{this.props.help}</span>
            </div>
          </div>)}
      </div>
    )
  }
}
