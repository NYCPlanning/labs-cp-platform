import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

const BackButton = props => (
  <Link to={props.location.state ? props.location.state.returnTo : props.defaultLink} className="pull-right">
    <RaisedButton
      label={props.location.state ? 'Back to Map' : props.defaultText}
      icon={props.location.state ?
        <FontIcon
          className="fa fa-chevron-left"
          style={{
            fontSize: '16px',
            marginLeft: '0px',
            paddingLeft: '12px',
          }}
        /> :
        <FontIcon className="fa fa-map" style={{ fontSize: '16px' }} />
      }
      // style={{
      //   position: 'relative',
      //   marginTop: '32px',
      // }}
    />
  </Link>
);

BackButton.propTypes = {
  location: PropTypes.object.isRequired,
  defaultText: PropTypes.string.isRequired,
  defaultLink: PropTypes.string.isRequired,
};

module.exports = BackButton;
