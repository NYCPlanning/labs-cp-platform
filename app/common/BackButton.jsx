import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link, browserHistory } from 'react-router';


const BackButton = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    defaultText: PropTypes.string.isRequired,
    defaultLink: PropTypes.string.isRequired,
  },

  render() {
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


    if (this.props.location.state) {
      return (
        <Button
          label={'Back to Map'}
          iconClass={'fa-chevron-left'}
          onClick={browserHistory.goBack}
        />
      );
    }

    return (
      <Link to={this.props.defaultLink}>
        <Button
          label={this.props.defaultText}
          iconClass={'fa-map'}
          onClick={null}
        />
      </Link>
    );
  },
});


module.exports = BackButton;
