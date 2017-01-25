import React from 'react';
import { Link } from 'react-router';

import colors from '../colors';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link
      to={{
        pathname: `/facilities/${d.uid}`,
        state: { modal: true, returnTo: '/facilities/all' },
      }}
    >
      <div
        className={'facilities-list-item'} style={{
          borderLeft: `5px solid ${colors.getColor(d.domain)}`,
        }}
      >
        <div className={'title'}>{d.facilityname}</div>
        <div className={'subtitle'}>{d.facilitytype}</div>
        <div className={'subtitle'}>{d.address}</div>
        <i className="fa fa-chevron-right" />
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: React.PropTypes.shape({
    properties: React.PropTypes.object,
  }),
};

export default Item;

