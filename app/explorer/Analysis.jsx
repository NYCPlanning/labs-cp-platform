import React from 'react';
import PropTypes from 'prop-types';

import CostGroupChart from './analysis/CostGroupChart';

const Analysis = () => {
  return (
    <div className="analysis">
      <CostGroupChart />
    </div>
  );
};

export default Analysis;
