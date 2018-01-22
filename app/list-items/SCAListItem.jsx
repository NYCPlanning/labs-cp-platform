import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link to={{ pathname: `/sca/${d.cartodb_id}`, state: { modal: true, returnTo: '/maps/sca' } }}>
      <div
        className={cx('sca-list-item', { selected: props.selected })}
        style={{
          borderLeft: `5px solid${'#5C99FF'}`,
        }}
      >
        <div className={'title'}>{d.schoolname} - {d.description ? d.description : 'No Description'}</div>
        <div className={'subtitle'}>{d.type}</div>
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
