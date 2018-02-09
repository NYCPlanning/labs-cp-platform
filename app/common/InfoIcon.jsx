import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const InfoIcon = props => (
  <OverlayTrigger
    placement={props.placement}
    overlay={<Tooltip id="tooltip">{props.text}</Tooltip>}
  >
    <i
      className={`fa ${props.icon}`}
      style={{ paddingLeft: '5px' }}
      aria-hidden="true"
    />
  </OverlayTrigger>
);

InfoIcon.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  placement: PropTypes.string.isRequired,
};

InfoIcon.defaultProps = {
  text: null,
  icon: 'fa-info-circle',
  placement: 'right',
};

export default InfoIcon;
