import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const InfoIcon = props => (
  <OverlayTrigger
    placement={props.placement}
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
  placement: PropTypes.string.isRequired,
};

InfoIcon.defaultProps = {
  text: null,
  placement: 'right',
};

export default InfoIcon;
