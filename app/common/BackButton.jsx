import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link, browserHistory } from 'react-router';


const Button = props => (
  <RaisedButton
    className="back-button"
    label={props.label}
    icon={<FontIcon
      className={`fa ${props.iconClass}`}
      style={{
        fontSize: '16px',
      }}
    />}
    onClick={props.onClick}
    style={{
      marginBottom: '15px',
      marginRight: '15px',
    }}
  />
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
};

const BackButton = (props) => {
  if (props.location.state) {
    return (
      <Button
        label={'Back'}
        iconClass={'fa-chevron-left'}
        onClick={browserHistory.goBack}
      />
    );
  }

  return (
    <Link to={props.defaultLink}>
      <Button
        label={props.defaultText}
        iconClass={'fa-map'}
      />
    </Link>
  );
};

BackButton.propTypes = {
  location: PropTypes.object.isRequired,
  defaultLink: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
};

module.exports = BackButton;
