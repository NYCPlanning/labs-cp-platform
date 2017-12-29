import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DownloadButton from './download/DownloadButton';

class Download extends React.Component {
  activeLayers = () => this.props.layers.filter(layer => layer.enabled);
  activeLayerIDs = () => this.activeLayers().map(layer => layer.id);

  layerMap = {
    'capital-projects': {
      title: 'Capital Projects',
      noun: 'projects',
      icon: 'usd',
    },
    scaplan: {
      title: 'SCA Capital Projects',
      noun: 'projects',
      icon: 'graduation-cap',
    },
    'housing-development': {
      title: 'Housing Development',
      noun: 'developments',
      icon: 'cubes',
    },
    'cb-budgetrequests': {
      title: 'Budget Requests',
      noun: 'requests',
      icon: 'book',
    },
    'facilities-cp': {
      title: 'Facilities',
      noun: 'facilities',
      icon: 'university',
    },
  }

  layers = [
    'capital-projects',
    // 'scaplan',
    'housing-development',
    'cb-budgetrequests',
    'facilities-cp',
  ];

  render() {
    const { counts, sql } = this.props;
    const layers = this.props.isLoggedIn ? this.layers : ['facilities-cp'];

    return (<div>
      {
        layers.map(layerID => (
          <div className="download-row" key={layerID}>
            <h5><span className={`fa fa-${this.layerMap[layerID].icon}`} /> {this.layerMap[layerID].title}</h5>
            <DownloadButton
              layerID={layerID}
              noun={this.layerMap[layerID].noun}
              sql={sql[layerID]}
              counts={{
                total: counts.total[layerID],
                filtered: counts.filtered[layerID],
              }}
              filtered={counts.total[layerID] !== counts.filtered[layerID]}
            />
          </div>
        ))
      }
    </div>);
  }
}

Download.propTypes = {
  layers: PropTypes.array.isRequired,
  counts: PropTypes.object.isRequired,
  sql: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ facilitiesCP, capitalProjects, cbBudgetRequests, housingDevelopment, currentUser }) => ({
  counts: {
    total: {
      'capital-projects': capitalProjects.pointsTotalCount + capitalProjects.polygonsTotalCount,
      'facilities-cp': facilitiesCP.totalCount,
      'cb-budgetrequests': cbBudgetRequests.totalCount,
      'housing-development': housingDevelopment.totalCount,
    },
    filtered: {
      'capital-projects': capitalProjects.selectedCount,
      'facilities-cp': facilitiesCP.selectedCount,
      'cb-budgetrequests': cbBudgetRequests.selectedCount,
      'housing-development': housingDevelopment.selectedCount,
    },
  },
  sql: {
    'capital-projects': capitalProjects.sql,
    'facilities-cp': facilitiesCP.sql,
    'cb-budgetrequests': cbBudgetRequests.sql,
    'housing-development': housingDevelopment.sql,
  },
  isLoggedIn: currentUser.isLoggedIn,
});

export default connect(mapStateToProps)(Download);
