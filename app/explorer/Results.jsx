import React from 'react';
import PropTypes from 'prop-types';

import CPListItem from '../list-items/CPListItem';
import SCAListItem from '../list-items/SCAListItem';
import FacilitiesListItem from '../list-items/FacilitiesListItem';
import HousingDevelopmentListItem from '../list-items/HousingDevelopmentListItem';
import BudgetRequestLineItem from '../list-items/BudgetRequestListItem';

const Results = (props) => {
  const selectedItems = props.selectedFeatures.map((feature) => {
    if (!props.detailPageId) return null;

    switch (feature.layer.source) {
      case 'capital-projects': {
        return (<CPListItem
          feature={feature}
          selected={feature.properties.maprojid === props.detailPageId}
          key={`cp${feature.properties.maprojid}`}
        />);
      }
      case 'sca-points': {
        return (<SCAListItem
          feature={feature}
          selected={feature.properties.cartodb_id.toString() === props.detailPageId.toString()}
          key={`sca${feature.properties.cartodb_id}`}
        />);
      }
      case 'facilities': {
        return (<FacilitiesListItem
          feature={feature}
          selected={feature.properties.uid.toString() === props.detailPageId.toString()}
          key={`fac${feature.properties.uid}`}
        />);
      }
      case 'housing-development': {
        return (<HousingDevelopmentListItem
          feature={feature}
          selected={feature.properties.job_number.toString() === props.detailPageId.toString()}
          key={`dev${feature.properties.job_number}`}
        />);
      }
      default:
        return null;
    }
  });

  return (
    <div className="scroll-container">
      {selectedItems}
    </div>
  );
};

Results.propTypes = {
  selectedFeatures: PropTypes.array,
  detailPageId: PropTypes.string,
};

Results.defaultProps = {
  selectedFeatures: [],
  detailPageId: null,
};

export default Results;
