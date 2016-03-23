import React, {Component, PropTypes} from 'react'

const helpStyle = {
  fontSize: 12
}

export default class TextElement extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
    rows: PropTypes.number,
    placeholder: PropTypes.string
  };

  render(){
    const {label, field, rows, help, placeholder } = this.props

    return(<div className="form-group">
      <label className="col-md-2 control-label">{label}</label>
      <div className="col-md-10">
          <textarea className="form-control" {...field}
            placeholder={placeholder} rows={rows? rows : 2}
            aria-describedby={field.name + '-help-block'}>
          </textarea>

        <span id={field.name + '-help-block'} style={helpStyle} className="help-block">{help}</span>
      </div>
    </div>)
  }
}
