import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import BudgetRequestFilter from './filter/BudgetRequestFilter';

const SidebarComponent = () => (
  <Tabs
    className="sidebar-tabs"
    tabTemplateStyle={{
      position: 'absolute',
      top: 0,
      bottom: 0,
    }}
  >
    <Tab label="Filters">
      <BudgetRequestFilter />
    </Tab>
    <Tab label="About">
      <div className="sidebar-tab-content">
        <div className="scroll-container padded">
          <div>
            <h4>Community Board Budget Requests</h4>
            <p>Every year, New York City’s 59 Community Boards submit their capital and expense priorities to City
              agencies for their consideration in their departmental estimates.  The Capital Planning Explorer maps
              the budget priorities that contain specific location information, including specific sites, facilities,
              or street segments.</p>

            <p>Each mapped budget request contains the following information: request type, responsible agency,
              accompanying explanation, location and contact information for the community board.
              Community board budget priorities that are not site-specific and apply to the community more generally
              have not been mapped on this explorer.</p>

            <p>City agencies can use this explorer to view the mapped budget priorities in relation to ongoing
              citywide capital projects; this will help agencies to evaluate the community board’s budget priorities,
              plan for future projects and in community outreach activities.</p>

            <p>For questions about the content and functionality of the mapped budget priorities,
              contact <a href="mailto:CDNeeds_DL@planning.nyc.gov">CDNeeds_DL@planning.nyc.gov</a>.</p>

            <strong>Limitations and Disclaimers</strong><br />
            <p>The mapped budget priorities are based on data submitted by community boards, which may be incomplete
              or inaccurate. DCP cannot verify the accuracy of all locations. The Office of Management and Budget
              is the definitive source on community board budget priorities.</p>
          </div>
        </div>
      </div>
    </Tab>
  </Tabs>
);

export default SidebarComponent;
