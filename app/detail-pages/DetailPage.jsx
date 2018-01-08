import React from 'react';
import PropTypes from 'prop-types';

import CapitalProjectDetailPage from './CapitalProjectDetailPage';
import HousingDetailPage from './HousingDetailPage';
import FacilityDetailPage from './FacilityDetailPage';
import BudgetRequestDetailPage from './BudgetRequestDetailPage';

class DetailPage extends React.Component {
  componentWillMount() {
    this.props.setDetailPageType(this.props.route.type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route.type !== this.props.route.type) this.props.setDetailPageType(this.props.route.type);
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
          <FacilityDetailPage
            id={this.props.params.id}
            location={this.props.location}
            pops
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
      </div>
    );
  }
}

DetailPage.propTypes = {
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setDetailPageType: PropTypes.func.isRequired,
};

export default DetailPage;
