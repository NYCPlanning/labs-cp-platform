import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

const DetailPage = props => (
  <div className="fluid-content display-content">
    <div className="col-md-12">
      <Link to={props.location.state ? props.location.state.returnTo : props.defaultLink} className="pull-right">
        <RaisedButton
          label={props.location.state ? 'Back to Map' : props.defaultText}
          icon={props.location.state ?
            <FontIcon className="fa fa-chevron-left" /> :
            <FontIcon className="fa fa-map" />
          }
        />
      </Link>
    </div>
    {props.children}
  </div>
);

DetailPage.propTypes = {
  location: PropTypes.object.isRequired,
  defaultText: PropTypes.string.isRequired,
  defaultLink: PropTypes.string.isRequired,
  children: PropTypes.object,
};

DetailPage.defaultProps = {
  children: null,
};


module.exports = DetailPage;
