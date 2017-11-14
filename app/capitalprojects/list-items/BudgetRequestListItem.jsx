import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './ListItem.scss';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link
      to={{
        pathname: `/budgetrequest/${d.maprojid}`,
        state: { modal: true, returnTo: '/capitalprojects' },
      }}
    >
      <div
        className={'budget-request-list-item'}
        style={{
          borderLeft: `5px solid ${d.budgetcate === 'Expense' ? '#a6cee3' : '#b2df8a'}`,
        }}
      >
        <div className={'title'}>{d.need}</div>
        <div className={'subtitle'}>Agency: {d.agency}</div>
        <div className={'subtitle'}>CB: {d.name}</div>

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
