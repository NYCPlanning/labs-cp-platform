import React from 'react';
import { Link } from 'react-router';

import colors from '../colors';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link
      to={{
        pathname: `/development/${d.cartodb_id}`,
        state: { modal: true, returnTo: '/pipeline' },
      }}
    >
      <div
        className={'facilities-list-item'} style={{
          borderLeft: `5px solid ${colors.getStatusColor(d.dcp_permit_type)}`,
        }}
      >
        <div className={'title'}>{d.dob_permit_address}</div>
        <div className={'subtitle'}>{`${d.dcp_pipeline_status} | ${d.dcp_units_use_map} units`}</div>
        <i className="fa fa-chevron-right" />
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: React.PropTypes.object.isRequired,
};

export default Item;
