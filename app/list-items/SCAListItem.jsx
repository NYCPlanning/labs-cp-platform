import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <div
      className={cx('sca-list-item', { selected: props.selected })}
      style={{
        borderLeft: `5px solid${'#5C99FF'}`,
      }}
    >
      <div className={'title'}>{d.schoolname} - {d.description ? d.description : 'No Description'}</div>
      <div className={'subtitle'}>{d.type}</div>
    </div>
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
