import React from 'react';
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
  location: React.PropTypes.object,
  defaultText: React.PropTypes.string,
  defaultLink: React.PropTypes.string,
  children: React.PropTypes.object,
};


module.exports = DetailPage;
