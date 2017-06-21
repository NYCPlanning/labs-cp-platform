import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { getColor } from '../config';

const Item = ({ feature }) => {
  const { cartodb_id,
          dcp_permit_type,
          dob_permit_address,
          dcp_pipeline_status,
          dcp_units_use_map } = feature.properties;

  return (
    <Link to={{ pathname: `/development/${cartodb_id}`, state: { modal: true, returnTo: '/pipeline' } }}>
      <div
        className="facilities-list-item"
        style={{ borderLeft: `5px solid ${getColor('dcp_permit_type', dcp_permit_type)}` }}
      >

        <div className="title">
          { dob_permit_address }
        </div>

        <div className="subtitle">
          { dcp_pipeline_status } | { dcp_units_use_map } units
        </div>

        <i className="fa fa-chevron-right" />
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: PropTypes.object.isRequired,
};

export default Item;
