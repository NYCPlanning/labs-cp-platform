import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CapitalProjectDetailPage from './CapitalProjectDetailPage';
import HousingDetailPage from './HousingDetailPage';
import FacilityDetailPage from './FacilityDetailPage';
import BudgetRequestDetailPage from './BudgetRequestDetailPage';

class DetailPage extends React.Component {
  componentWillMount() {
    console.log(this.props.route);
    // this.fetchPageData(this.props.params.id);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.params.id !== this.props.params.id) this.fetchPageData(nextProps.params.id);
  // }
  //
  // fetchPageData(id) {
  //   this.props.fetchDetails(id);
  // }

  render() {
    return (
      <div>
        { }
      </div>
    );
  }
}

DetailPage.propTypes = {
  route: PropTypes.object.isRequired,
};

export default DetailPage;
