import React, { PropTypes } from 'react'

const styles = {
  color: '#3C3C3C'
}

class Details extends React.Component {
  constructor(props){
    super(props);
    //props.faculty = facs.filter(f => f.id === props.params.id);
    //props.test = 'testtttttt';
  }
  render(){
    return(
      // <p> {this.props.faculty.title} </p>
      <ul>
        {
          this.props.map(p =>
          <li>{p}</li>
        )}
      </ul>
      );
   }
}

var FacultyDetails = (props) =>

  <div>
    <h3>معلومات الكلية</h3>
    <br/>
    <dl class="dl-horizontal">
      <div className="row">
        <div className="col-md-6">
          <dt>إسم الكلية</dt>
          <dd>{props.title}</dd>
        </div>
        <div className="col-md-6">
          <dt>الإسم بالإنجليزية</dt>
          <dd>{props.titleTr}</dd>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <dt>الإختصار</dt>
          <dd>{props.id}</dd>
        </div>
        <div className="col-md-6">
          <dt>نشطة</dt>
          <dd>{props.active
              ?
              <i className="fa fa-check fa-2x" style={styles}></i>
              :
              <i className="fa fa-times fa-2x" style={styles}></i>}
          </dd>
        </div>
      </div>
    </dl>
  </div>;

  FacultyDetails.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleTr: PropTypes.string,
    active: PropTypes.bool.isRequired
  }

module.exports = Details
