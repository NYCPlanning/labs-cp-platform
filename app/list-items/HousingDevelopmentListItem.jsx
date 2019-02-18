import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

import { getColor } from '../filter-configs/housing-config';

const Item = ({ feature, selected }) => {
  const { job_number,
          job_type,
          address,
          status,
          units_net } = feature.properties;

  return (
    <Link to={{ pathname: `/development/${job_number}` }}>
      <div
        className={cx('facilities-list-item', { selected })}
        style={{ borderLeft: `5px solid ${getColor('job_type', job_type)}` }}
      >

        <div className="title">
          { address }
        </div>

        <div className="subtitle">
          { status } | { units_net } units
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
