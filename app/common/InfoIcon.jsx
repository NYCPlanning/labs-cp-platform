import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const InfoIcon = props => (
  <OverlayTrigger
    placement="right"
    overlay={
      <Tooltip id="tooltip">{props.text}</Tooltip>
    }
  >
    <i
      className="fa fa-info-circle"
      style={{
        paddingLeft: '5px',
      }}
      aria-hidden="true"
    />
  </OverlayTrigger>
);

InfoIcon.propTypes = {
  text: React.PropTypes.string,
};

InfoIcon.defaultProps = {
  text: null,
};

module.exports = InfoIcon;
