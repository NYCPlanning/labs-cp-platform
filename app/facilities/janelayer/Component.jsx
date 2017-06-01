import React from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from '../LayerSelector';
import Download from '../../common/Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';
import FacilitiesStore from '../../stores/FacilitiesStore';

class Facilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapConfig: FacilitiesStore.mapConfig,
      filterDimensions: FacilitiesStore.filterDimensions,
      totalCount: FacilitiesStore.totalCount,
      selectedCount: FacilitiesStore.selectedCount,
    };
  }

  componentWillMount() {
    // listen for changes to the filter UI

    FacilitiesStore.on('facilitiesUpdated', () => {
      const { totalCount, selectedCount, filterDimensions, mapConfig } = FacilitiesStore;

      this.setState({
        totalCount,
        selectedCount,
        filterDimensions,
        mapConfig,
      });
    });

    FacilitiesStore.initialize();
  }

  componentDidUpdate() {
    this.updateMapConfig();
  }

  componentWillUnmount() {
    FacilitiesStore.removeAllListeners('facilitiesUpdated');
  }

  updateMapConfig = () => {
    const { mapConfig } = this.state;

    mapConfig.legend = (
      <div className="legendSection">
        <p>Disclaimer: This map aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. Not all sites are service locations, among other limitations. <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers">Read more</a>.</p>
      </div>
    );

    this.props.onUpdate(mapConfig);
  }

  handleDownload = (label) => {
    ga.event({
      category: 'faciities-explorer',
      action: 'download',
      label,
    });
  }

  // builds a legend with a composed date range, updates layer config,
  // updates the layerconfig and sends it up to Jane
  renderLegend = () => {
    const self = this;

    const legendContent = (
      <div className="legendSection">
        <p>Disclaimer: This map aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. Not all sites are service locations, among other limitations. <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers">Read more</a>.</p>
      </div>
    );

    const newLayer = update(self.props.layer, {
      legend: {
        $set: legendContent,
      },
    });

    this.props.onUpdate('facilities', newLayer);
  }

  render() {
    // necessary for scrolling in tab Content
    const tabTemplateStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
    };

    const { filterDimensions, totalCount, selectedCount } = this.state;

    return (
      <Tabs
        className="sidebar-tabs"
        tabTemplateStyle={tabTemplateStyle}
      >
        <Tab label="Data">
          <LayerSelector
            totalCount={totalCount}
            selectedCount={selectedCount}
            filterDimensions={filterDimensions}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content ">
            <div className="scroll-container padded">
              <Download
                sql={FacilitiesStore.sql}
                filePrefix="facilities"
                onDownload={this.handleDownload}
              />
              <SignupPrompt />
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              {content.about}
              <SignupPrompt />
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

Facilities.defaultProps = {
  onUpdate: () => {},
};

Facilities.propTypes = {
  onUpdate: PropTypes.func,
};

export default Facilities;
