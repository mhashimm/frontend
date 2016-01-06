import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { TextBool } from '~/components/Elements'

class Details extends React.Component {
  render(){
    const faculty = this.props.faculties.find(f => f.id === this.props.params.id)
    return(
      <div>
        <h3>معلومات الكلية</h3>
        <Link className="btn btn-primary pull-left" to={`/admin/faculties/update/${faculty.id}`}>
        <i className="fa fa-pencil-square-o" style={{paddingLeft:5}}></i>
        تعديل
        </Link>
        <br/>
        <br/>
        <FacultyDetails {...faculty}/>
      </div>
      );
   }
}

var FacultyDetails = (props) =>

  <div>
    <br/>
    <dl className="dl-horizontal">
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
          <dd>
            <TextBool value={props.isActive} />
          </dd>
        </div>
      </div>
    </dl>
  </div>;

  FacultyDetails.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleTr: PropTypes.string,
    isActive: PropTypes.bool.isRequired
  }

module.exports = connect((state) => ({faculties: state.faculties}))(Details)
