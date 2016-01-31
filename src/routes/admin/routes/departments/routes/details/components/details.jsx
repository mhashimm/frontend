import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { TextBool, DetailsButton } from '~/components/elements'

class Details extends Component {
  render(){
    const department = this.props.departments.find(f => f.id === this.props.params.id)
    return(
      <div>
        <h3>معلومات القسم</h3>
        <DetailsButton kls="pull-left" text="تعديل"
          url={`/admin/departments/update/${department.id}`}/>
        <br/>
        <br/>
        <DepartmentDetails {...department}/>
      </div>
      );
   }
}

var DepartmentDetails = (props) =>

  <div>
    <br/>
    <dl className="dl-horizontal">
      <div className="row">
        <div className="col-md-6">
          <dt>إسم القسم</dt>
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
          <dt>نشم</dt>
          <dd>
            <TextBool value={props.isActive} />
          </dd>
        </div>
      </div>
    </dl>
  </div>;

  DepartmentDetails.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleTr: PropTypes.string,
    isActive: PropTypes.bool.isRequired
  }

module.exports = connect((state) => ({departments: state.departments}))(Details)
