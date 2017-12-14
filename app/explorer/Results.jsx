import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CPListItem from '../list-items/CPListItem';
import SCAListItem from '../list-items/SCAListItem';
import FacilitiesListItem from '../list-items/FacilitiesListItem';
import HousingDevelopmentListItem from '../list-items/HousingDevelopmentListItem';
import BudgetRequestLineItem from '../list-items/BudgetRequestListItem';

class Results extends React.Component {
  render() {
    const selectedItems = this.props.selectedFeatures.map((feature) => {
      switch (feature.layer.source) {
        case 'capital-projects':
          return <CPListItem feature={feature} key={`cp${feature.id}`} />;
        case 'sca-points':
          return <SCAListItem feature={feature} key={`sca${feature.id}`} />;
        case 'facilities-cp':
          return <FacilitiesListItem feature={feature} key={`fac${feature.properties.uid}`} />;
        case 'housing-development':
          return <HousingDevelopmentListItem feature={feature} key={`dev${feature.properties.cartodb_id}`} />;
        case 'cb-budgetrequests':
          return <BudgetRequestLineItem feature={feature} key={`cbbr${feature.properties.cartodb_id}`} />;
        default:
          return null;
      }
    });

    return (
      <div className="results-pane">
        {selectedItems}
      </div>
    );
  }
}

Results.propTypes = {
  selectedFeatures: PropTypes.array.isRequired,
};

const mapStateToProps = ({ capitalProjects }) => ({
  selectedFeatures: capitalProjects.selectedFeatures,
});

export default connect(mapStateToProps)(Results);
