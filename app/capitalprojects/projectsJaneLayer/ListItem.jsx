import React from 'react';

import agencies from '../agencies';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <div
      className={'capital-projects-list-item'} style={{
        borderLeft: `5px solid ${agencies.getAgencyColor(d.agency)}`,
      }}
    >
      <div className={'title'}>{d.descriptio}</div>
      <div className={'subtitle'}>Cost: ${d.totalcost}</div>

      <i className="fa fa-chevron-right" />
    </div>
  );
};

Item.propTypes = {
  feature: React.PropTypes.shape({
    properties: React.PropTypes.object,
  }),
};

export default Item;
