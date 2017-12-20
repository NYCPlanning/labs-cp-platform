import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import colors from '../facilities/colors';

const Item = (props) => {
  const d = props.feature.properties;

  function pathname() {
    if (d.facsubgrp === 'Privately Owned Public Space') {
      const pops_id = d.idagency.match(/: (\w+)/)[1];
      return `/pops/${pops_id}`;
    }
    return `/facility/${d.uid}`;
  }

  return (
    <Link
      to={{
        pathname: pathname(),
        state: { modal: true, returnTo: '/facilities/explorer' },
      }}
    >
      <div
        className={'facilities-list-item'}
        style={{
          borderLeft: `5px solid ${colors.getColor(d.facdomain)}`,
        }}
      >
        <div className={'title'}>{d.facname}</div>
        <div className={'subtitle'}>{d.factype}</div>
        <div className={'subtitle'}>{d.address}</div>
        <div className={'subtitle'}><span className={'operated-by'}>Operated by:</span> {d.opname}</div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.object.isRequired,
  }).isRequired,
};

export default Item;
