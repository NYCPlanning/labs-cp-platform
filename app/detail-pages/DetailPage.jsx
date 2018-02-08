import React from 'react';
import PropTypes from 'prop-types';

import CapitalProjectDetailPage from './CapitalProjectDetailPage';
import HousingDetailPage from './HousingDetailPage';
import FacilityDetailPage from './FacilityDetailPage';
// import PopsDetailPage from './PopsDetailPage';
import BudgetRequestDetailPage from './BudgetRequestDetailPage';
import SCADetailPage from './SCADetailPage';

class DetailPage extends React.Component {
  componentWillMount() {
    this.setDetailPageData(this.props.params.id, this.props.route.type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) this.setDetailPageData(nextProps.params.id, nextProps.route.type);
  }

  setDetailPageData(id, type) {
    this.props.setDetailPageData({ type, id });
  }

  render() {
    return (
      <div>
        { this.props.route.type === 'capitalproject' &&
          <CapitalProjectDetailPage
            id={this.props.params.id}
          />
        }

        { this.props.route.type === 'facility' &&
          <FacilityDetailPage
            id={this.props.params.id}
            location={this.props.location}
          />
        }

        { this.props.route.type === 'pops' &&
          // <PopsDetailPage
          <FacilityDetailPage
            id={this.props.params.id}
            location={this.props.location}
          />
        }

        { this.props.route.type === 'development' &&
          <HousingDetailPage
            id={this.props.params.id}
          />
        }

        { this.props.route.type === 'budgetrequest' &&
          <BudgetRequestDetailPage
            id={this.props.params.id}
          />
        }

        {
          this.props.route.type === 'sca' &&
          <SCADetailPage
            id={this.props.params.id}
            location={this.props.location}
          />
        }
      </div>
    );
  }
}

DetailPage.propTypes = {
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setDetailPageData: PropTypes.func,
};

DetailPage.defaultProps = {
  setDetailPageData: () => {},
};

export default DetailPage;
