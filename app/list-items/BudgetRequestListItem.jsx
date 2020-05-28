import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link to={{ pathname: `/budgetrequest/${d.regid}` }} >
      <div
        className={cx('budget-request-list-item', { selected: props.selected })}
        style={{
          borderLeft: `5px solid ${d.budgetcategory === 'Expense' ? '#a6cee3' : '#b2df8a'}`,
        }}
      >
        <div className={'title'}>{d.need}</div>
        <div className={'subtitle'}>{d.agency}</div>
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
