import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

import colors from '../facilities/colors';

const Item = (props) => {
  const d = props.feature.properties;

  function pathname() {
    if (d.facsubgrp === 'PRIVATELY OWNED PUBLIC SPACE') {
      return `/pops/${d.uid}`;
    }
    return `/facility/${d.uid}`;
  }

  return (
    <Link to={{ pathname: pathname() }} >
      <div
        className={cx('facilities-list-item', { selected: props.selected })}
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
  selected: PropTypes.bool,
};

Item.defaultProps = {
  selected: false,
};

export default Item;
