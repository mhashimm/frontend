import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { TextBool, DetailsButton } from '~/components/elements'

class Details extends React.Component {
  render(){
    const course = this.props.courses.find(f => f.id === this.props.params.id)
    return(
      <div>
        <h3>معلومات المقرر</h3>
        <DetailsButton kls="pull-left" text="تعديل"
          url={`/admin/courses/update/${course.id}`}/>
        <br/>
        <br/>
        <CourseDetails {...course}/>
      </div>
      );
   }
}

var CourseDetails = (props) =>

  <div>
    <br/>
    <dl className="dl-horizontal">
      <div className="row">
        <div className="col-md-6">
          <dt>إسم المقرر</dt>
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
          <dt>نشط</dt>
          <dd>
            <TextBool value={props.isActive} />
          </dd>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <dt>القسم</dt>
          <dd>{props.departmentId}</dd>
        </div>
        <div className="col-md-6">
          <dt>الكلية</dt>
          <dd>
            <TextBool value={props.facultyId} />
          </dd>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <dt>ملحوظات</dt>
          <dd>{props.remarks}</dd>
        </div>
      </div>

    </dl>
  </div>;

  CourseDetails.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleTr: PropTypes.string,
    isActive: PropTypes.bool.isRequired
  }

module.exports = connect((state) => ({courses: state.courses}))(Details)
