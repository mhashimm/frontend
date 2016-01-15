import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { TextBool, DetailsButton } from '~/components/elements'

class Details extends Component {
  render(){
    const program = this.props.programs.find(f => f.id === this.props.params.id)
    return(
      <div>
        <h3>معلومات البرنامج</h3>
        <DetailsButton kls="pull-left" text="تعديل"
          url={`/admin/programs/update/${program.id}`}/>
        <br/>
        <br/>
        <ProgramDetails {...program}/>
      </div>
      );
   }
}

var ProgramDetails = (props) =>
  <div>
    <br/>
    <dl className="dl-horizontal">
      <div className="row">
        <div className="col-md-6">
          <dt>إسم البرنامج</dt>
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
          <dt>الساعات</dt>
          <dd>{props.creditHours}</dd>
        </div>
        <div className="col-md-6">
          <dt>الفصول</dt>
          <dd>
            <TextBool value={props.terms} />
          </dd>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <dt>الكلية</dt>
          <dd>{props.facultyId}</dd>
        </div>
      </div>
    </dl>
  </div>;

  ProgramDetails.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleTr: PropTypes.string,
    isActive: PropTypes.bool.isRequired
  }

module.exports = connect((state) => ({programs: state.programs}))(Details)
