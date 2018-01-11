import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

import { getColor } from '../filter-configs/housing-config';

const Item = ({ feature, selected }) => {
  const { dob_job_number,
          dcp_dev_category,
          address,
          dcp_status,
          u_net } = feature.properties;

  return (
    <Link to={{ pathname: `/development/${dob_job_number}`, state: { modal: true, returnTo: '/maps/housing' } }}>
      <div
        className={cx('facilities-list-item', { selected })}
        style={{ borderLeft: `5px solid ${getColor('dcp_dev_category', dcp_dev_category)}` }}
      >

        <div className="title">
          { address }
        </div>

        <div className="subtitle">
          { dcp_status } | { u_net } units
        </div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

Item.defaultProps = {
  selected: false,
};

export default Item;
