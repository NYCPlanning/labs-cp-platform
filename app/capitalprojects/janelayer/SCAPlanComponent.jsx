import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

class SCAPlanComponent extends React.Component {
  render() {
    // necessary for scrolling in tab Content
    const tabTemplateStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
    };

    return (
      <Tabs
        className="sidebar-tabs"
        tabTemplateStyle={tabTemplateStyle}
      >
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <h4>Product Overview</h4>
              <p>
                <b>The SCA Capital Plan Map’s</b> reports data from and maps school projects reported in the SCA Capital Plan published by the School Construction Authority in February 2017.  The main purpose of this tool is to be a starting point for exploring potential, planned, and ongoing SCA capital projects to better understand and communicate New York City’s capital project portfolio within and across particular agencies. This view provides a broad understanding of what projects are taking place within a certain area, and opportunities for strategic neighborhood planning.
              </p>

              <h4>Limitations and Disclaimers</h4>
              <p>
                <li>This is not a project management system, so data on project timeline or scope</li>
                <li>Planned projects that may never come to fruition are captured</li>
                <li>The spatial data are not 100% reliable, accurate, or exhaustive</li>
              </p>
              <p>
              As a result of these limitations and inconsistencies, the SCA Capital Plan Map is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses, - it is built for planning coordination and information purposes only.  Please consult <a href="http://docs.capitalplanning.nyc/cpdb/" target="_blank" rel="noreferrer noopener">NYC Planning’s Capital Planning Docs</a> for more details about the limitations.
              </p>

              <h4>Feedback</h4>
              <p>
              We are constantly looking for ways to improve this product.  Please <a href="mailto:capital@planning.nyc.gov">share your feedback and suggestions</a> with Capital Planning.
              </p>
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default SCAPlanComponent;
