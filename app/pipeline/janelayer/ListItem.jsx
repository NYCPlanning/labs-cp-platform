import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { getColor } from '../config';

const Item = ({ feature }) => {
  const { cartodb_id,
          dcp_category_development,
          address,
          dcp_status,
          units_net } = feature.properties;

  return (
    <Link to={{ pathname: `/development/${cartodb_id}`, state: { modal: true, returnTo: '/pipeline' } }}>
      <div
        className="facilities-list-item"
        style={{ borderLeft: `5px solid ${getColor('dcp_category_development', dcp_category_development)}` }}
      >

        <div className="title">
          { address }
        </div>

        <div className="subtitle">
          { dcp_status } | { units_net } units
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
