import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import numeral from 'numeral';

// import agencies from '../agencies';

import './ListItem.scss';

const Item = (props) => {
  const d = props.feature.properties;
  console.log(d);

  return (
    <div
      className={'capital-projects-list-item'} style={{
        borderLeft: `5px solid${d.totalspend > 0 ? '#d98127' : '#8B8C98'}`,
      }}
    >
      <div className={'title'}>{d.schoolname} - {d.description ? d.description : 'No Description'}</div>
      <div className={'subtitle'}>{d.type}</div>

      <i className="fa fa-chevron-right" />
    </div>
  );
};

Item.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.object.isRequired,
  }).isRequired,
};

export default Item;
