import React from 'react'

exports.splash = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <p>This interactive explorer of the new Facilities dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress. We also encourage you to <a href="http://docs.capitalplanning.nyc/facdb/">read more about the data</a> powering this map.</p>     
    <p>If you're seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
  </div>
)

exports.about = (
  <div>
    <h4>Product Overview</h4>
    <p>
      The City Planning Facilities Database (FacDB) aggregates information about facilities and program sites that are owned, operated, funded, licensed or certified by a City, State, or Federal agency in the City of New York. These facilities generally impact the quality of the city’s neighborhoods, and they span six domains:
    </p>
    
      <ul type={"disc"}>
        <li>Health and Human Services</li>
        <li>Education, Child Welfare, and Youth</li>
        <li>Public Safety, Emergency Services, and Administration of Justice</li>
        <li>Core Infrastructure and Transportation</li>
        <li>Parks, Cultural, and Other Community Facilities</li>
        <li>Administration of Government (See note in Disclaimers)</li>
      </ul>
      This database and interactive map build upon City Planning’s decades-old work on the Selected Facilities and Program Sites Database, which this new product replaces, and capture the location, type, and capacity of public and private facilities in order to inform holistic neighborhood planning, strategic site selection and service delivery planning, opportunities for interagency and public-private partnerships, community outreach activities, and many other functions across City agencies.
    
    <p>
      One goal of this database is to provide a consolidated, authoritative dataset that can serve as a one-stop-shop to planners. More broadly, the intent is to provide the foundation for a more robust data-integration initiative, ensuring interoperability between disparate agencies’ datasets. City Planning has grouped these facilities according to the following domains, each with a set of groups, subgroups, and facility types that are intended to make the data easy to navigate and more useful for specific planning purposes. Facility types and names are pulled directly from source datasets, wherever possible.
    </p>
    <p>
      Currently, FacDB aggregates and synthesizes data sourced from 42 agencies, recording more than 45,000 facilities throughout NYC. More facilities will be added as the data become available to the Department of City Planning. Special thanks goes to all the agencies who make their data available for this effort, particularly those who publish their data on a routine basis.
    </p>
    <p>
      Details on the facility categories, fields in the database, data sources, and the database update process is provided on the Capital Planning Platform <a href="http://docs.capitalplanning.nyc/facdb/">Docs</a> site.
    </p>

    <h4>Limitations and Disclaimers</h4>
    <p>
      FacDB is only as good as the source data it aggregates. Currently, FacDB is the most comprehensive, spatial data resource available of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains. Many records could not be geocoded. There are also known to be cases when the address provided in the source data is for a headquarters office rather the facility site location. Unfortunately these could not be systematically verified. We hope to resolve as many of these limitations as possible over time, and seek feedback from the user community on potential approaches to improving the data. For more detailed information on a specific facility please reach out to the respective oversight agency.
    </p>
    <p>
      <b>Duplicates.</b> Please be aware that this beta version of the database also includes cases of duplicate records for the same facility. This is because several of the source datasets have content that overlaps with other datasets. We are working to systematically identify these duplicate records and retain the most up-to-date and detailed record.
    </p>
    <p>
      <b>Analysis Limitations.</b> As a result of these data limitations and inconsistencies, users should be careful in their use of this database not to develop analyses that may be suspect. For example, a comparison of the density or accessibility of facilities across neighborhoods should recognize that some of the facilities included are organizational headquarters rather than service sites, and that this database is not authoritatively comprehensive.
    </p>

    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a> with Capital Planning.
    </p>
  </div>
)

