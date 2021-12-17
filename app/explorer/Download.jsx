import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DownloadButton from './download/DownloadButton';
import DownloadButtonCapitalProjects from './download/DownloadButtonCapitalProjects';
import DownloadButtonHousing from './download/DownloadButtonHousing';

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
    'facilities': {
      title: 'Facilities',
      noun: 'Facilities',
      icon: 'university',
    },
  }

  layers = [
    'capital-projects',
    // 'scaplan',
    'housing-development',
    'facilities',
  ];

  render() {
    const { counts, sql } = this.props;
    const layers = this.layers;

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

            { layerID === 'housing-development' &&
              <DownloadButtonHousing
                layerID={'housing-development'}
                noun={this.layerMap['housing-development'].noun}
                sql={sql['housing-development']}
                counts={{
                  total: counts.total['housing-development'],
                  filtered: counts.filtered['housing-development'],
                  raw: counts.total['housing-development-raw'],
                }}
                filtered={counts.total['housing-development'] !== counts.filtered['housing-development']}
              />
            }

            { layerID === 'facilities' &&
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


const mapStateToProps = ({ facilities, capitalProjects, capitalProjectsTable, housingDevelopment, currentUser }) => ({
  counts: {
    total: {
      'capital-projects': capitalProjects.totalCount,
      'capital-projects-table': capitalProjectsTable.totalCount,
      'facilities': facilities.totalCount,
      'housing-development': housingDevelopment.totalCount,
      'housing-development-raw': housingDevelopment.totalCountRaw,
    },
    filtered: {
      'capital-projects': capitalProjects.selectedCount,
      'capital-projects-table': capitalProjectsTable.selectedCount,
      'facilities': facilities.selectedCount,
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
    facilities: facilities.sql,
    'housing-development': housingDevelopment.sql,
  },
  isLoggedIn: currentUser.isLoggedIn,
});

export default connect(mapStateToProps)(Download);
