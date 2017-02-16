import React from 'react';
import { Link } from 'react-router';

import colors from '../colors';

import './ListItem.scss';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link
      to={{
        pathname: `/facility/${d.uid}`,
        state: { modal: true, returnTo: '/facilities/explorer' },
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
        <div className={'subtitle'}><span className={'operated-by'}>Operated by:</span> {d.operatorname}</div>
        <i className="fa fa-chevron-right" />
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: React.PropTypes.shape({
    properties: React.PropTypes.object.isRequired,
  }).isRequired,
};

export default Item;
