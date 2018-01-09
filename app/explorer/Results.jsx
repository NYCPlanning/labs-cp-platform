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
      switch (feature.layer.source) {
        case 'capital-projects': {
          const selected = feature.properties.maprojid === this.props.detailPageId;
          return <CPListItem feature={feature} selected={selected} key={`cp${feature.properties.maprojid}`} />;
        }
        case 'sca-points': {
          const selected = feature.properties.cartodb_id === this.props.detailPageId;
          return <SCAListItem feature={feature} selected={selected} key={`sca${feature.properties.cartodb_id}`} />;
        }
        case 'facilities-cp': {
          const selected = feature.properties.uid === this.props.detailPageId;
          return <FacilitiesListItem feature={feature} selected={selected} key={`fac${feature.properties.uid}`} />;
        }
        case 'housing-development': {
          const selected = feature.properties.dob_job_number === this.props.detailPageId;
          return <HousingDevelopmentListItem feature={feature} selected={selected} key={`dev${feature.properties.dob_job_number}`} />;
        }
        case 'cb-budgetrequests': {
          const selected = feature.properties.regid === this.props.detailPageId;
          return <BudgetRequestLineItem feature={feature} selected={selected} key={`cbbr${feature.properties.regid}`} />;
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
