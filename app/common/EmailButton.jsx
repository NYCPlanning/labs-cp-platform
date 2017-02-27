// <a class="react-sharing-button__link react-sharing-button--email" href="mailto:?subject=Check%20out%20this%20NYC%20facility%20record&amp;body=%2Ffacility%2F2781b5bdfcda75dbc13b9df87013b970" target="_blank" rel="noopener noreferrer">

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

const EmailButton = props => (

  <Link
    to={`mailto:?subject=${props.subject}&body=${props.body}`}
    target="_blank"
  >
    <RaisedButton
      className="email-button"
      label={'Share this page'}
      icon={<FontIcon
        className={'fa fa-envelope-o'}
        style={{
          fontSize: '16px',
        }}
      />}
      style={{
        marginBottom: '15px',
        marginRight: '15px',
      }}
    />
  </Link>
);

EmailButton.propTypes = {
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default EmailButton;
