import React, { PropTypes } from 'react'


var Details = (props) =>
  <div>
    <h3>معلومات الكلىة</h3>
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
          <dd>{props.active}</dd>
        </div>
      </div>
    </dl>
  </div>;

  Details.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleTr: PropTypes.string,
    active: PropTypes.bool.isRequired
  }

module.exports = Details
