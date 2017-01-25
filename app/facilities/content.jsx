import React from 'react';

exports.splash = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <p>This interactive explorer of the new Facilities dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress. We also encourage you to <a href="http://docs.capitalplanning.nyc/facdb/">read more about the data</a> powering this map.</p>
    <p>If you&quot;re seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
  </div>
);

exports.about = (
  <div>
    <h4>Product Overview</h4>
    <p>
      The City Planning Facilities Database (FacDB) aggregates information about facilities and program sites that are owned, operated, funded, licensed or certified by a City, State, or Federal agency in the City of New York. These facilities generally impact the quality of the city’s neighborhoods, and they span six domains:
    </p>

    <ul type={'disc'}>
      <li>Health and Human Services</li>
      <li>Education, Child Welfare, and Youth</li>
      <li>Public Safety, Emergency Services, and Administration of Justice</li>
      <li>Core Infrastructure and Transportation</li>
      <li>Parks, Cultural, and Other Community Facilities</li>
      <li>Administration of Government (See note in Disclaimers)</li>
    </ul>

    <h4>Limitations and Disclaimers</h4>
    <p>
      FacDB is only as good as the source data it aggregates. Currently, FacDB is the most comprehensive, spatial data resource available of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains.
    </p>
    <p>
      Please consult <a href="http://docs.capitalplanning.nyc/facdb/">NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
    </p>

    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a> with Capital Planning.
    </p>
  </div>
);
