import React from 'react';
import PropTypes from 'prop-types';

import CPListItem from '../list-items/CPListItem';
import SCAListItem from '../list-items/SCAListItem';
import FacilitiesListItem from '../list-items/FacilitiesListItem';
import HousingDevelopmentListItem from '../list-items/HousingDevelopmentListItem';
import BudgetRequestLineItem from '../list-items/BudgetRequestListItem';

class Results extends React.Component {
  render() {
    const selectedItems = this.props.selectedFeatures.map((feature) => {
      if (!this.props.detailPageId) return null;

      switch (feature.layer.source) {
        case 'capital-projects': {
          return (<CPListItem
            feature={feature}
            selected={feature.properties.maprojid === this.props.detailPageId}
            key={`cp${feature.properties.maprojid}`}
          />);
        }
        case 'sca-points': {
          return (<SCAListItem
            feature={feature}
            selected={feature.properties.cartodb_id.toString() === this.props.detailPageId.toString()}
            key={`sca${feature.properties.cartodb_id}`}
          />);
        }
        case 'facilities-cp': {          
          return (<FacilitiesListItem
            feature={feature}
            selected={feature.properties.uid.toString() === this.props.detailPageId.toString()}
            key={`fac${feature.properties.uid}`}
          />);
        }
        case 'housing-development': {
          return (<HousingDevelopmentListItem
            feature={feature}
            selected={feature.properties.dob_job_number.toString() === this.props.detailPageId.toString()}
            key={`dev${feature.properties.dob_job_number}`}
          />);
        }
        case 'cb-budgetrequests': {
          return (<BudgetRequestLineItem
            feature={feature}
            selected={feature.properties.regid.toString() === this.props.detailPageId.toString()}
            key={`cbbr${feature.properties.regid}`}
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
  }
}

Results.propTypes = {
  selectedFeatures: PropTypes.array,
  detailPageId: PropTypes.string,
};

Results.defaultProps = {
  selectedFeatures: [],
  detailPageId: null,
};

export default Results;
