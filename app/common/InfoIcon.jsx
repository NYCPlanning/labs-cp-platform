import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const InfoIcon = props => (
  <OverlayTrigger
    placement="right"
    overlay={<Tooltip id="tooltip">{props.text}</Tooltip>}
  >
    <i
      className="fa fa-info-circle"
      style={{ paddingLeft: '5px' }}
      aria-hidden="true"
    />
  </OverlayTrigger>
);

InfoIcon.propTypes = {
  text: PropTypes.string,
};

InfoIcon.defaultProps = {
  text: null,
};

export default InfoIcon;
