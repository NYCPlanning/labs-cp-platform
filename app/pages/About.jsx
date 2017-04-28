import React from 'react';
import Paper from 'material-ui/Paper';

import Footer from '../common/Footer';

import './About.scss';

const paperStyle = {
  width: '100%',
  padding: '15px',
};

const About = () => (
  <div className="fluid-content">
    <div className="about-page container">
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What is the Capital Planning Platform?</h3>
            <p>The Capital Planning Platform is a new resource for collaborative planning, powered by open data and open source technology.</p>

            <p>The New York City Department of City Planning pioneered open data with <b><a href="http://www1.nyc.gov/site/planning/data-maps/open-data.page">Bytes of the Big Apple</a></b> a decade ago. With the creation of the DCP&quot;s Capital Planning Division in 2014, we envisioned a new civic technology resource: the Capital Planning Platform - a place for planners to access the maps, data, and analytics that they need to plan for public investments in neighborhoods and collaborate with one another. The NYC Facilities Explorer (beta) is a first step in building this vision. Over the months and years to come, we plan to add more map layers, new and improved datasets, and new analysis tools to this mapping platform to help automate a broad array of planning analyses and make the capital planning process more efficient, coordinated, and strategic across the public and private sectors in New York City.</p>

            <p>The Capital Planning Platform complements other data and maps that DCP produces. We also encourage users to explore the following resources, among others, on <b><a href="http://www1.nyc.gov/site/planning/index.page">DCP&quot;s website</a></b>.</p>

            <ul type={'disc'}>
              <li><b><a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a></b> - An interactive tool for creating demographic, social, economic, and housing profiles for neighborhoods and user-defined groupings of Census tracts.</li>
              <li><b><a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a></b> - Extensive land use and geographic data at the tax lot level in multiple formats.</li>
              <li><b><a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a></b> – ZoLA provides a simple way to research zoning regulations in New York City.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a></b> - This interactive map identifies and provides information about New York City’s inventory of publicly-accessible waterfront spaces.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/community/community-portal.page">Community Portal</a></b> - The DCP Community Portal offers resources on a variety of topics related to land use, community planning, and demographic trends for each of New York City’s 59 Community Boards</li>
            </ul>

          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>About the Technology</h3>
            <p>The NYC Facilities Explorer and Capital Planning Platform are built in-house by the Capital Planning team at the Department of City Planning. We use free and open source software, as well as low-cost web services, to enable rapid prototyping and deployment of technology with a small, nimble team of developers, and to facilitate collaborative environment for technology development. Our technology is an ever-evolving work in progress, and we are always interested in partnering with civic-minded technologists to improve this technology and advance its adoption, so please drop us a line at <b><a href="mailto:capital@planning.nyc.gov">capital@planning.nyc.gov</a></b>.</p>

            <p><b>Web Mapping Technology.</b> We use a self-hosted Carto server that provides read-only access to our bulk spatial data, and serves up vector tiles, shapefiles, CSVs geojson, and json on-demand.  We use the MapboxGL.js library to control data styling, layering and camera views, providing a rich visual experience for exploring NYC&quot;s spatial open datasets.</p>

            <p><b>React and React-Router.</b> The Capital Planning Platform is a Single Page Application (SPA), with all routing and business logic handled in the client, with calls to various web APIs for content and data as needed.  React.js provides a component-based approach to web development, allowing for tightly-coupled HTML and javascript that can be composed and easily re-used throughout the platform.</p>

            <p><b>Third Party Services.</b> With a small development team and limited budget, we chose to make use of inexpensive third-party services for key parts of the stack, rather than building and maintaining them on our own.  These include Github for version control and issue tracking, Waffle for team collaboration and issue prioritization, Codeship for continuous integration, and Auth0 for authentication and authorization.</p>

            <p><b>Jane Maps - A framework for rich, composable web maps using React and MapboxGL</b> Through the course of the development of the platform, we saw a need for a frontend web mapping framework that could combine map data symbology and rendering with custom User Interfaces and Multi-Layering capabilities.  Jane Maps allows us to quickly compose MapboxGL maps with modular layer configurations that include UI such as filtering, downloads, &quot;about&quot; panes, and more.   By taking advantage of React&quot;s built-in lifecycle methods, Jane acts as a map controller, adding, manipulating, and removing sources and layers from a MapboxGL map in our site.  It also handles location search, interactivity, and legends.  See <a href="https://github.com/NYCPlanning/jane-maps">the Jane Maps repo on Github</a> for more information.  Pull Requests are welcomed!</p>

            <p>We call it Jane in honor of Jane Jacobs; we hope it helps provide a new way of looking at cities and neighborhoods, just as she did.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>Thanks</h3>
            <p>The Capital Planning team – including Danny Fuchs (Director), Chris Whong, Hannah Kates, Amanda Doyle, Simon Mettler, Neera Chatterjee, and Jessica Mathew – express our deepest thanks to the amazing staff of the Department of City Planning for their support in the development of the Capital Planning Platform and NYC Facilities Explorer, including CIO Hassan Adekoya and COO Jon Kaufman, as well as former Director Carl Weisbrod, who brought Capital Planning back to the Department. Additional thanks to our interns Jonathan Pichot, Ian Stuart, and Ben Miller.</p>

            <p>This database and explorer would not be possible if it weren’t for the incredible work of dozens of City, State, and Federal agencies who develop the source datasets that are the basis for this map. Particular thanks goes to those agencies who publish their data on open data portals.</p>

            <p>Additional specific thanks goes to a broad array of people who have helped consult on the development of the Capital Planning Platform and Jane Maps, including Kristi Brown, Paul Ramsey, Tim Wisniewski, Chase Gilliam, Richard Dunks, Bill Hunt, Ariel Kennan, Tom Johnson, Dave Riordan, Matt Gardner, Mark Headd, Lauren Ellsworth, Steve Romalewski, the team at Stamen, and many more.</p>
          </Paper>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const AboutFacilities = () => (
  <div className="fluid-content">
    <div className="about-page container">
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What is the Capital Planning Platform?</h3>
            <p>The Capital Planning Platform is a new resource for collaborative planning, powered by open data and open source technology.</p>

            <p>The New York City Department of City Planning pioneered open data with <b><a href="http://www1.nyc.gov/site/planning/data-maps/open-data.page">Bytes of the Big Apple</a></b> a decade ago. With the creation of the DCP&quot;s Capital Planning Division in 2014, we envisioned a new civic technology resource: the Capital Planning Platform - a place for planners to access the maps, data, and analytics that they need to plan for public investments in neighborhoods and collaborate with one another. The NYC Facilities Explorer (beta) is a first step in building this vision. Over the months and years to come, we plan to add more map layers, new and improved datasets, and new analysis tools to this mapping platform to help automate a broad array of planning analyses and make the capital planning process more efficient, coordinated, and strategic across the public and private sectors in New York City.</p>

            <p>The Capital Planning Platform complements other data and maps that DCP produces. We also encourage users to explore the following resources, among others, on <b><a href="http://www1.nyc.gov/site/planning/index.page">DCP&quot;s website</a></b>.</p>

            <ul type={'disc'}>
              <li><b><a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a></b> - An interactive tool for creating demographic, social, economic, and housing profiles for neighborhoods and user-defined groupings of Census tracts.</li>
              <li><b><a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a></b> - Extensive land use and geographic data at the tax lot level in multiple formats.</li>
              <li><b><a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a></b> – ZoLA provides a simple way to research zoning regulations in New York City.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a></b> - This interactive map identifies and provides information about New York City’s inventory of publicly-accessible waterfront spaces.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/community/community-portal.page">Community Portal</a></b> - The DCP Community Portal offers resources on a variety of topics related to land use, community planning, and demographic trends for each of New York City’s 59 Community Boards</li>
            </ul>

          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What is the NYC Facilities Explorer?</h3>
            <p>The New York City Department of City Planning aggregates information about facilities and program sites that are owned, operated, funded, licensed or certified by a City, State, or Federal agency in the City of New York into a central database called the City Planning Facilities Database. These facilities generally help to shape quality of life in the city’s neighborhoods, and this dataset is the basis for a series of planning activities.</p>

            <p>The NYC Facilities Explorer is designed to make this expansive database more accessible to planners and city-builders across the five boroughs, and to help all New Yorkers understand the breadth of government resources in their neighborhoods. Specifically, this explorer and dataset can be used to inform the siting or realignment of certain government and community facilities and programs, certain environmental impact assessments, community planning and engagement, infrastructure planning, and a range of other planning and community-building activities. We take a user-centered approach to designing database and explorer improvements, so please do <b><a href="https://docs.google.com/forms/d/e/1FAIpQLScP9JxDvfCmMUxzT9l0_MRYBtTgeAep7pHYO5QUtrRCXGxVTw/viewform">let us know</a></b> how you want to use this product - and how we can make it better.</p>

            <p>The NYC Facilities Explorer is powered by open data and open source technology. It is a work-in-progress that City Planning is launching in beta because we believe in building technology collaboratively with the people who will use it most. We hope that the community of government employees, civic technologists, and New Yorkers who are interested in using this improved dataset and mapping platform to build stronger, more equitable neighborhoods will use the data responsibly and share their feedback on how we can make the tool more useful.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What’s included on the map?</h3>
            <p>The City Planning Facilities Database aggregates more than 35,000 records from 43 different public data sources provided by City, State, and Federal agencies. While each source agency classifies its facilities according to their own naming systems, we have grouped all facilities and program sites into the following seven categories to help planners navigate the data more easily:</p>

            <ul type={'disc'}>
              <li>Health and Human Services</li>
              <li>Education, Child Welfare, and Youth</li>
              <li>Parks, Gardens, and Historical Sites</li>
              <li>Libraries and Cultural Programs</li>
              <li>Public Safety, Emergency Services, and Administration of Justice</li>
              <li>Core Infrastructure and Transportation</li>
              <li>Administration of Government</li>
            </ul>

            <p>Within each of these domains, each record is further categorized into a set of facility groups, subgroups, and types that are intended to make the data easy to navigate and more useful for specific planning purposes. Facility types and names appear as they do in source datasets, wherever possible. A full listing of the facility categories is provided in the <b><a href="http://docs.capitalplanning.nyc/facdb/#ii-contents-and-classification-hierarchy">Contents and Classification</a></b> section of the metadata.</p>

            <p>This database and its <b><a href="http://capitalplanning.nyc.gov/facilities">interactive map</a></b> build upon City Planning’s decades-old work on the Selected Facilities and Program Sites Database, which this new product replaces. Improvements include more facility types, improved data quality, and a restructured the database for easier use. We have also automated our means of refreshing the data from the majority of sources – we anticipate that the data will be refreshed on at least a quarterly basis (although source datasets may be refreshed less frequently). Please read more about the limitations of this data product below.</p>

            <p>More facilities will be added as the data become available to the Department of City Planning. Special thanks goes to all the agencies who make their data available for this effort, particularly those who publish their data on a routine basis.</p>

          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What are the limitations of the data?</h3>
            <p>The City Planning Facilities Database (FacDB) is only as good as the source data it aggregates, and the Department of City Planning cannot verify the accuracy of all records. We strongly encourage users to <b><a href="http://docs.capitalplanning.nyc/facdb/">read the metadata</a></b> before using this product for planning purposes.</p>

            <p><b>Analysis Limitations.</b> Largely as a result of the limitations and inconsistencies described below, users should be careful in their use of this database not to develop analyses that may be suspect. For example, a comparison of the density or accessibility of facilities across neighborhoods should recognize that due to the structure of the database and the prevalence of duplicate records, a ‘count’ of facilities and program sites may not be an accurate reflection of facility concentration; that some of the facilities included are organizational headquarters or mailing addresses rather than service sites; and that this database is not authoritatively comprehensive. In addition, we rely on source data from other agencies to populate the explorer, and some of these sources may fall out-of-date – users can find the date of each source dataset’s latest update within each facility detail page.</p>

            <p><b>Missing Records.</b> Currently, FacDB is the most comprehensive, spatial data resource available of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains. Some facilities are deliberately excluded in the data that source agencies provide in order to protect the safety and privacy of their clients. Many records also could not be geocoded. To learn more about how the data is processed, please review the <b><a href="http://docs.capitalplanning.nyc/facdb/#iv-methodology">Methodology</a></b>.</p>

            <p><b>Duplicates.</b> Please be aware that this beta version of the database includes cases of duplicate records for the same facility. This is because several of the source datasets have content that overlaps with other datasets. We are working to systematically identify these remaining duplicate records and retain all useful attributes from each record.</p>

            <p><b>Administrative Addresses.</b> There are also known to be cases when the address provided in the source data is for a headquarters office rather than the facility site location. Unfortunately, these could not be systematically verified. We hope to resolve as many of these limitations as possible over time, and seek feedback from the user community on potential approaches to improving the data. For more detailed information on a specific facility please reach out to the respective oversight agency.</p>

            <p><b>Public Accessibility of Sites.</b> DCP is unable to verify the public accessibility of all sites. For example, some playgrounds or playing fields may only be accessible to participants in certain programs.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>About the Technology</h3>
            <p>The NYC Facilities Explorer and Capital Planning Platform are built in-house by the Capital Planning team at the Department of City Planning. We use free and open source software, as well as low-cost web services, to enable rapid prototyping and deployment of technology with a small, nimble team of developers, and to facilitate collaborative environment for technology development. Our technology is an ever-evolving work in progress, and we are always interested in partnering with civic-minded technologists to improve this technology and advance its adoption, so please drop us a line at <b><a href="mailto:capital@planning.nyc.gov">capital@planning.nyc.gov</a></b>.</p>

            <p><b>Web Mapping Technology.</b> We use a self-hosted Carto server that provides read-only access to our bulk spatial data, and serves up vector tiles, shapefiles, CSVs geojson, and json on-demand.  We use the MapboxGL.js library to control data styling, layering and camera views, providing a rich visual experience for exploring NYC&quot;s spatial open datasets.</p>

            <p><b>React and React-Router.</b> The Capital Planning Platform is a Single Page Application (SPA), with all routing and business logic handled in the client, with calls to various web APIs for content and data as needed.  React.js provides a component-based approach to web development, allowing for tightly-coupled HTML and javascript that can be composed and easily re-used throughout the platform.</p>

            <p><b>Third Party Services.</b> With a small development team and limited budget, we chose to make use of inexpensive third-party services for key parts of the stack, rather than building and maintaining them on our own.  These include Github for version control and issue tracking, Waffle for team collaboration and issue prioritization, Codeship for continuous integration, and Auth0 for authentication and authorization.</p>

            <p><b>Jane Maps - A framework for rich, composable web maps using React and MapboxGL</b> Through the course of the development of the platform, we saw a need for a frontend web mapping framework that could combine map data symbology and rendering with custom User Interfaces and Multi-Layering capabilities.  Jane Maps allows us to quickly compose MapboxGL maps with modular layer configurations that include UI such as filtering, downloads, &quot;about&quot; panes, and more.   By taking advantage of React&quot;s built-in lifecycle methods, Jane acts as a map controller, adding, manipulating, and removing sources and layers from a MapboxGL map in our site.  It also handles location search, interactivity, and legends.  See <a href="https://github.com/NYCPlanning/jane-maps">the Jane Maps repo on Github</a> for more information.  Pull Requests are welcomed!</p>

            <p>We call it Jane in honor of Jane Jacobs; we hope it helps provide a new way of looking at cities and neighborhoods, just as she did.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>Thanks</h3>
            <p>The Capital Planning team – including Danny Fuchs (Director), Chris Whong, Hannah Kates, Amanda Doyle, Simon Mettler, Neera Chatterjee, and Jessica Mathew – express our deepest thanks to the amazing staff of the Department of City Planning for their support in the development of the Capital Planning Platform and NYC Facilities Explorer, including CIO Hassan Adekoya and COO Jon Kaufman, as well as former Director Carl Weisbrod, who brought Capital Planning back to the Department. Additional thanks to our interns Jonathan Pichot, Ian Stuart, and Ben Miller.</p>

            <p>This database and explorer would not be possible if it weren’t for the incredible work of dozens of City, State, and Federal agencies who develop the source datasets that are the basis for this map. Particular thanks goes to those agencies who publish their data on open data portals.</p>

            <p>Additional specific thanks goes to a broad array of people who have helped consult on the development of the Capital Planning Platform and Jane Maps, including Kristi Brown, Paul Ramsey, Tim Wisniewski, Chase Gilliam, Richard Dunks, Bill Hunt, Ariel Kennan, Tom Johnson, Dave Riordan, Matt Gardner, Mark Headd, Lauren Ellsworth, Steve Romalewski, the team at Stamen, and many more.</p>
          </Paper>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const AboutPipeline = () => (
  <div className="fluid-content">
    <div className="about-page container">
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What is the Capital Planning Platform?</h3>
            <p>The Capital Planning Platform is a new resource for collaborative planning, powered by open data and open source technology.</p>

            <p>The New York City Department of City Planning pioneered open data with <b><a href="http://www1.nyc.gov/site/planning/data-maps/open-data.page">Bytes of the Big Apple</a></b> a decade ago. With the creation of the DCP&quot;s Capital Planning Division in 2014, we envisioned a new civic technology resource: the Capital Planning Platform - a place for planners to access the maps, data, and analytics that they need to plan for public investments in neighborhoods and collaborate with one another. The NYC Facilities Explorer (beta) is a first step in building this vision. Over the months and years to come, we plan to add more map layers, new and improved datasets, and new analysis tools to this mapping platform to help automate a broad array of planning analyses and make the capital planning process more efficient, coordinated, and strategic across the public and private sectors in New York City.</p>

            <p>The Capital Planning Platform complements other data and maps that DCP produces. We also encourage users to explore the following resources, among others, on <b><a href="http://www1.nyc.gov/site/planning/index.page">DCP&quot;s website</a></b>.</p>

            <ul type={'disc'}>
              <li><b><a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a></b> - An interactive tool for creating demographic, social, economic, and housing profiles for neighborhoods and user-defined groupings of Census tracts.</li>
              <li><b><a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a></b> - Extensive land use and geographic data at the tax lot level in multiple formats.</li>
              <li><b><a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a></b> – ZoLA provides a simple way to research zoning regulations in New York City.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a></b> - This interactive map identifies and provides information about New York City’s inventory of publicly-accessible waterfront spaces.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/community/community-portal.page">Community Portal</a></b> - The DCP Community Portal offers resources on a variety of topics related to land use, community planning, and demographic trends for each of New York City’s 59 Community Boards</li>
            </ul>

          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>About the Technology</h3>
            <p>The NYC Facilities Explorer and Capital Planning Platform are built in-house by the Capital Planning team at the Department of City Planning. We use free and open source software, as well as low-cost web services, to enable rapid prototyping and deployment of technology with a small, nimble team of developers, and to facilitate collaborative environment for technology development. Our technology is an ever-evolving work in progress, and we are always interested in partnering with civic-minded technologists to improve this technology and advance its adoption, so please drop us a line at <b><a href="mailto:capital@planning.nyc.gov">capital@planning.nyc.gov</a></b>.</p>

            <p><b>Web Mapping Technology.</b> We use a self-hosted Carto server that provides read-only access to our bulk spatial data, and serves up vector tiles, shapefiles, CSVs geojson, and json on-demand.  We use the MapboxGL.js library to control data styling, layering and camera views, providing a rich visual experience for exploring NYC&quot;s spatial open datasets.</p>

            <p><b>React and React-Router.</b> The Capital Planning Platform is a Single Page Application (SPA), with all routing and business logic handled in the client, with calls to various web APIs for content and data as needed.  React.js provides a component-based approach to web development, allowing for tightly-coupled HTML and javascript that can be composed and easily re-used throughout the platform.</p>

            <p><b>Third Party Services.</b> With a small development team and limited budget, we chose to make use of inexpensive third-party services for key parts of the stack, rather than building and maintaining them on our own.  These include Github for version control and issue tracking, Waffle for team collaboration and issue prioritization, Codeship for continuous integration, and Auth0 for authentication and authorization.</p>

            <p><b>Jane Maps - A framework for rich, composable web maps using React and MapboxGL</b> Through the course of the development of the platform, we saw a need for a frontend web mapping framework that could combine map data symbology and rendering with custom User Interfaces and Multi-Layering capabilities.  Jane Maps allows us to quickly compose MapboxGL maps with modular layer configurations that include UI such as filtering, downloads, &quot;about&quot; panes, and more.   By taking advantage of React&quot;s built-in lifecycle methods, Jane acts as a map controller, adding, manipulating, and removing sources and layers from a MapboxGL map in our site.  It also handles location search, interactivity, and legends.  See <a href="https://github.com/NYCPlanning/jane-maps">the Jane Maps repo on Github</a> for more information.  Pull Requests are welcomed!</p>

            <p>We call it Jane in honor of Jane Jacobs; we hope it helps provide a new way of looking at cities and neighborhoods, just as she did.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>Thanks</h3>
            <p>The Capital Planning team – including Danny Fuchs (Director), Chris Whong, Hannah Kates, Amanda Doyle, Simon Mettler, Neera Chatterjee, and Jessica Mathew – express our deepest thanks to the amazing staff of the Department of City Planning for their support in the development of the Capital Planning Platform and NYC Facilities Explorer, including CIO Hassan Adekoya and COO Jon Kaufman, as well as former Director Carl Weisbrod, who brought Capital Planning back to the Department. Additional thanks to our interns Jonathan Pichot, Ian Stuart, and Ben Miller.</p>

            <p>This database and explorer would not be possible if it weren’t for the incredible work of dozens of City, State, and Federal agencies who develop the source datasets that are the basis for this map. Particular thanks goes to those agencies who publish their data on open data portals.</p>

            <p>Additional specific thanks goes to a broad array of people who have helped consult on the development of the Capital Planning Platform and Jane Maps, including Kristi Brown, Paul Ramsey, Tim Wisniewski, Chase Gilliam, Richard Dunks, Bill Hunt, Ariel Kennan, Tom Johnson, Dave Riordan, Matt Gardner, Mark Headd, Lauren Ellsworth, Steve Romalewski, the team at Stamen, and many more.</p>
          </Paper>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const AboutCapitalProjects = () => (
  <div className="fluid-content">
    <div className="about-page container">
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What is the Capital Planning Platform?</h3>
            <p>The Capital Planning Platform is a new resource for collaborative planning, powered by open data and open source technology.</p>

            <p>The New York City Department of City Planning pioneered open data with <b><a href="http://www1.nyc.gov/site/planning/data-maps/open-data.page">Bytes of the Big Apple</a></b> a decade ago. With the creation of the DCP&quot;s Capital Planning Division in 2014, we envisioned a new civic technology resource: the Capital Planning Platform - a place for planners to access the maps, data, and analytics that they need to plan for public investments in neighborhoods and collaborate with one another. The NYC Facilities Explorer (beta) is a first step in building this vision. Over the months and years to come, we plan to add more map layers, new and improved datasets, and new analysis tools to this mapping platform to help automate a broad array of planning analyses and make the capital planning process more efficient, coordinated, and strategic across the public and private sectors in New York City.</p>

            <p>The Capital Planning Platform complements other data and maps that DCP produces. We also encourage users to explore the following resources, among others, on <b><a href="http://www1.nyc.gov/site/planning/index.page">DCP&quot;s website</a></b>.</p>

            <ul type={'disc'}>
              <li><b><a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a></b> - An interactive tool for creating demographic, social, economic, and housing profiles for neighborhoods and user-defined groupings of Census tracts.</li>
              <li><b><a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a></b> - Extensive land use and geographic data at the tax lot level in multiple formats.</li>
              <li><b><a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a></b> – ZoLA provides a simple way to research zoning regulations in New York City.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a></b> - This interactive map identifies and provides information about New York City’s inventory of publicly-accessible waterfront spaces.</li>
              <li><b><a href="http://www1.nyc.gov/site/planning/community/community-portal.page">Community Portal</a></b> - The DCP Community Portal offers resources on a variety of topics related to land use, community planning, and demographic trends for each of New York City’s 59 Community Boards</li>
            </ul>

          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>What is the NYC Capital Projects Explorer?</h3>

            <p>This explorer is a resource provided by DCP primarily created from data published by other City agencies.  The main purpose of this tool is to be a starting point for exploring potential, planned, and ongoing capital projects to better understand and communicate New York City’s capital project portfolio within and across particular agencies.  This integrated view provides a broad understanding of what projects are taking place within a certain area, and opportunities for strategic neighborhood planning.</p>

            <p><b>Where the data come from</b></p>
            <p>The majority of data points captured within DCP’s Capital Projects Database are derived from the <b><a href="http://www1.nyc.gov/site/omb/publications/finplan01-17.page">Capital Commitment Plan</a></b> published by OMB, which contains planned commitments to ongoing or potential future capital projects. Supporting data are obtained from <b><a href="http://www.checkbooknyc.com/spending_landing/category/3/yeartype/B/year/118?expandBottomCont=true">Checkbook NYC</a></b>, a resource provided by the Comptroller.  Spatial data are derived from but not limited to data created and published by <b><a href="http://maps.nyc.gov/doitt/nycitymap/">DDC</a></b>, <b><a href="http://dotgisiis01.dot.nycnet/FCPM_10yr_Plan/#18/40.74288/-73.91130">DOT</a></b>, <b><a href="https://www.nycgovparks.org/planning-and-building/capital-project-tracker">DPR</a></b>, <b><a href="https://maps.nyc.gov/resiliency/">ORR</a></b>, and DCP.</p>

            <p><b>How you can use it</b></p>
            <p>The table view of Capital Projects Database can reliably be used to quickly and easily explore and learn about ongoing and planned capital projects published in the Capital Commitment Plan.  The map view of the Capital Projects Database can be used as a starting point for knowing and reporting what capital projects are taking place and where, and identifying any synergies or conflicts among projects.</p>

            <p>These resources can be used as a starting point to answer questions such as:</p>
            <ul type={'disc'}>
              <li>What projects are happening in a neighborhood or council district?</li>
              <li>What other agencies’ projects might impact another project’s funding or schedule?</li>
              <li>What capital investments are being made in growing neighborhoods?</li>
              <li>Are there geographically specific lump sums that can be tapped into?</li>
              <li>What are the most expensive projects in the City?</li>
            </ul>

            <p><b>Limitations</b></p>
            <ul type={'disc'}>
              <li>This is not a project management system, so data on project timeline or budget may be incorrect</li>
              <li>All monies committed to or spent on a project may not be captured</li>
              <li>Planned projects that may never come to fruition are captured</li>
              <li>The spatial data are not 100% reliable, accurate, or exhaustive</li>
            </ul>
            <p>As a result of these limitations and inconsistencies, the Capital Projects Map is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses, - it is built for planning coordination and information purposes only.  Please consult NYC Planning’s <b><a href="http://docs.capitalplanning.nyc/cpdb/">Capital Planning Docs</a></b> for more details about the limitations.</p>

            <p><b>Interested in more?</b></p>
            <p>We’re continuously working to improve the Capital Projects Explorer to make it as valuable of a resource as possible.  Currently, we’re partnering with other City agencies to improve how we map capital projects to increase the reliability of the spatial data.  If you have any ideas on how to improve this resource please share any suggestions with the team, or contact us directly if you’re interested in partnering with us.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>About the Technology</h3>
            <p>The NYC Facilities Explorer and Capital Planning Platform are built in-house by the Capital Planning team at the Department of City Planning. We use free and open source software, as well as low-cost web services, to enable rapid prototyping and deployment of technology with a small, nimble team of developers, and to facilitate collaborative environment for technology development. Our technology is an ever-evolving work in progress, and we are always interested in partnering with civic-minded technologists to improve this technology and advance its adoption, so please drop us a line at <b><a href="mailto:capital@planning.nyc.gov">capital@planning.nyc.gov</a></b>.</p>

            <p><b>Web Mapping Technology.</b> We use a self-hosted Carto server that provides read-only access to our bulk spatial data, and serves up vector tiles, shapefiles, CSVs geojson, and json on-demand.  We use the MapboxGL.js library to control data styling, layering and camera views, providing a rich visual experience for exploring NYC&quot;s spatial open datasets.</p>

            <p><b>React and React-Router.</b> The Capital Planning Platform is a Single Page Application (SPA), with all routing and business logic handled in the client, with calls to various web APIs for content and data as needed.  React.js provides a component-based approach to web development, allowing for tightly-coupled HTML and javascript that can be composed and easily re-used throughout the platform.</p>

            <p><b>Third Party Services.</b> With a small development team and limited budget, we chose to make use of inexpensive third-party services for key parts of the stack, rather than building and maintaining them on our own.  These include Github for version control and issue tracking, Waffle for team collaboration and issue prioritization, Codeship for continuous integration, and Auth0 for authentication and authorization.</p>

            <p><b>Jane Maps - A framework for rich, composable web maps using React and MapboxGL</b> Through the course of the development of the platform, we saw a need for a frontend web mapping framework that could combine map data symbology and rendering with custom User Interfaces and Multi-Layering capabilities.  Jane Maps allows us to quickly compose MapboxGL maps with modular layer configurations that include UI such as filtering, downloads, &quot;about&quot; panes, and more.   By taking advantage of React&quot;s built-in lifecycle methods, Jane acts as a map controller, adding, manipulating, and removing sources and layers from a MapboxGL map in our site.  It also handles location search, interactivity, and legends.  See <a href="https://github.com/NYCPlanning/jane-maps">the Jane Maps repo on Github</a> for more information.  Pull Requests are welcomed!</p>

            <p>We call it Jane in honor of Jane Jacobs; we hope it helps provide a new way of looking at cities and neighborhoods, just as she did.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>Thanks</h3>
            <p>The Capital Planning team – including Danny Fuchs (Director), Chris Whong, Hannah Kates, Amanda Doyle, Simon Mettler, Neera Chatterjee, and Jessica Mathew – express our deepest thanks to the amazing staff of the Department of City Planning for their support in the development of the Capital Planning Platform and NYC Facilities Explorer, including CIO Hassan Adekoya and COO Jon Kaufman, as well as former Director Carl Weisbrod, who brought Capital Planning back to the Department. Additional thanks to our interns Jonathan Pichot, Ian Stuart, and Ben Miller.</p>

            <p>This database and explorer would not be possible if it weren’t for the incredible work of dozens of City, State, and Federal agencies who develop the source datasets that are the basis for this map. Particular thanks goes to those agencies who publish their data on open data portals.</p>

            <p>Additional specific thanks goes to a broad array of people who have helped consult on the development of the Capital Planning Platform and Jane Maps, including Kristi Brown, Paul Ramsey, Tim Wisniewski, Chase Gilliam, Richard Dunks, Bill Hunt, Ariel Kennan, Tom Johnson, Dave Riordan, Matt Gardner, Mark Headd, Lauren Ellsworth, Steve Romalewski, the team at Stamen, and many more.</p>
          </Paper>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

module.exports = { About, AboutFacilities, AboutPipeline, AboutCapitalProjects };
