import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { getColor } from '../../filter-configs/housing-config';

const Item = ({ feature }) => {
  const { cartodb_id,
          dcp_dev_category,
          address,
          dcp_status,
          u_net } = feature.properties;

  return (
    <Link to={{ pathname: `/development/${cartodb_id}`, state: { modal: true, returnTo: '/maps/housing' } }}>
      <div
        className="facilities-list-item"
        style={{ borderLeft: `5px solid ${getColor('dcp_dev_category', dcp_dev_category)}` }}
      >

        <div className="title">
          { address }
        </div>

        <div className="subtitle">
          { dcp_status } | { u_net } units
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
