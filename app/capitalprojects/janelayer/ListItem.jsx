import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import numeral from 'numeral';

import agencies from '../agencies';

import './ListItem.scss';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link
      to={{
        pathname: `/capitalproject/${d.maprojid}`,
        state: { modal: true, returnTo: '/capitalprojects' },
      }}
    >
      <div
        className={'capital-projects-list-item'} style={{
          borderLeft: `5px solid ${agencies.getAgencyColor(d.agency)}`,
        }}
      >
        <div className={'title'}>{d.description}</div>
        <div className={'subtitle'}>Planned Commitments: ${numeral(d.totalcommit).format('0,0')}</div>

        <i className="fa fa-chevron-right" />
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
