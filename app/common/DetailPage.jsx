import React, { PropTypes } from 'react';

const DetailPage = props => (
  <div className="fluid-content display-content">
    {props.children}
  </div>
);

DetailPage.propTypes = {
  children: PropTypes.object,
};

DetailPage.defaultProps = {
  children: null,
};


module.exports = DetailPage;
