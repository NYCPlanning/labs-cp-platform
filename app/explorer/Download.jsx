import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DownloadButton from './download/DownloadButton';
import DownloadButtonCapitalProjects from './download/DownloadButtonCapitalProjects';
import DownloadButtonBudgetRequests from './download/DownloadButtonBudgetRequests';

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
      noun: 'Developments',
      icon: 'cubes',
    },
    'cb-budgetrequests': {
      title: 'Budget Requests',
      noun: 'Budget Requests',
      icon: 'book',
    },
    'facilities-cp': {
      title: 'Facilities',
      noun: 'Facilities',
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

            { layerID === 'capital-projects' &&
              <DownloadButtonCapitalProjects
                layerID={layerID}
                mapSql={sql['capital-projects']}
                commitmentsSql={sql['capital-projects-commitments']}
                tableSql={sql['capital-projects-table']}
                mapFiltered={counts.total['capital-projects'] !== counts.filtered['capital-projects']}
                tableFiltered={counts.total['capital-projects-table'] !== counts.filtered['capital-projects-table']}
                counts={{
                  table: counts.total['capital-projects-table'],
                  map: counts.total['capital-projects'],
                  tableFiltered: counts.filtered['capital-projects-table'],
                  mapFiltered: counts.filtered['capital-projects'],
                }}
              />
            }

            { layerID === 'cb-budgetrequests' &&
              <DownloadButtonBudgetRequests
                layerID={'cb-budgetrequests'}
                noun={this.layerMap['cb-budgetrequests'].noun}
                sql={sql['cb-budgetrequests']}
                counts={{
                  total: counts.total['cb-budgetrequests'],
                  filtered: counts.filtered['cb-budgetrequests'],
                }}
                filtered={counts.total['cb-budgetrequests'] !== counts.filtered['cb-budgetrequests']}
              />
            }

            { layerID !== 'capital-projects' && layerID !== 'cb-budgetrequests' &&
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
            }
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


const mapStateToProps = ({ facilities, capitalProjects, capitalProjectsTable, cbBudgetRequests, housingDevelopment, currentUser }) => ({
  counts: {
    total: {
      'capital-projects': capitalProjects.totalCount,
      'capital-projects-table': capitalProjectsTable.totalCount,
      'facilities-cp': facilities.totalCount,
      'cb-budgetrequests': cbBudgetRequests.totalCount,
      'housing-development': housingDevelopment.totalCount,
    },
    filtered: {
      'capital-projects': capitalProjects.selectedCount,
      'capital-projects-table': capitalProjectsTable.selectedCount,
      'facilities-cp': facilities.selectedCount,
      'cb-budgetrequests': cbBudgetRequests.selectedCount,
      'housing-development': housingDevelopment.selectedCount,
    },
  },
  sql: {
    'capital-projects': {
      points: capitalProjects.pointsSql,
      polygons: capitalProjects.polygonsSql,
    },
    'capital-projects-table': capitalProjectsTable.sql,
    'capital-projects-commitments': capitalProjectsTable.commitmentsSql,
    'facilities-cp': facilities.sql,
    'cb-budgetrequests': {
      points: cbBudgetRequests.pointsSql,
      polygons: cbBudgetRequests.polygonsSql,
    },
    'housing-development': housingDevelopment.sql,
  },
  isLoggedIn: currentUser.isLoggedIn,
});

export default connect(mapStateToProps)(Download);
