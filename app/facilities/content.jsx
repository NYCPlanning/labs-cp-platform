import React from 'react';

exports.splash = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <p>This interactive explorer of the new Facilities dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress. We also encourage you to <a href="http://docs.capitalplanning.nyc/facdb/" target="_blank" rel="noreferrer noopener">read more about the data</a> powering this map.</p>
    <p>If you&quot;re seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
  </div>
);

exports.about = (
  <div>
    <h4>Product Overview</h4>
    <p>
      The City Planning Facilities Database (FacDB) aggregates information about facilities that impact NYC neighborhood quality and are owned, operated, funded, licensed, or certified by a City, State, or Federal agency. They span seven domains:
    </p>

    <ul type={'disc'}>
      <li>Health and Human Services</li>
      <li>Education, Child Welfare, and Youth</li>
      <li>Parks, Gardens, and Historical Sites</li>
      <li>Libraries and Cultural Programs</li>
      <li>Public Safety, Emergency Services, and Administration of Justice</li>
      <li>Core Infrastructure and Transportation</li>
      <li>Administration of Government</li>
    </ul>

    <h4>Limitations and Disclaimers</h4>
    <p>
      FacDB aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. It does not claim to capture every facility within the specified domains. The are also known to be cases of duplicate records and administrative locations instead of service locations.
    </p>
    <p>
      Please consult <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers" target="_blank" rel="noreferrer noopener">NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
    </p>

    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLScP9JxDvfCmMUxzT9l0_MRYBtTgeAep7pHYO5QUtrRCXGxVTw/viewform" target="_blank" rel="noopener noreferrer">Please share your feedback and suggestions</a> with Capital Planning.
    </p>
  </div>
);
