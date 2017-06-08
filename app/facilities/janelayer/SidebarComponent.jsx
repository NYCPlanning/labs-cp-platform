import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from '../LayerSelector';
import Download from '../../common/Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';
import FacilitiesStore from '../../stores/FacilitiesStore';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDimensions: FacilitiesStore.filterDimensions,
      totalCount: FacilitiesStore.totalCount,
      selectedCount: FacilitiesStore.selectedCount,
    };
  }

  componentWillMount() {
    // listen for changes to the filter UI
    FacilitiesStore.on('facilitiesUpdated', () => {
      const { totalCount, selectedCount, filterDimensions } = FacilitiesStore;

      this.setState({
        totalCount,
        selectedCount,
        filterDimensions,
      });
    });

    FacilitiesStore.initialize();
  }


  componentWillUnmount() {
    FacilitiesStore.removeAllListeners('facilitiesUpdated');
  }

  handleDownload = (label) => {
    ga.event({
      category: 'faciities-explorer',
      action: 'download',
      label,
    });
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

export default SidebarComponent;
