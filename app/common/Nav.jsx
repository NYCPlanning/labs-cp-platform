import React from 'react';
import { Link } from 'react-router';

import AuthHelper from '../helpers/AuthHelper';

import './Nav.scss';

const collaborateContent = (
  <div>
    <h3 className="modal-opener">The Capital Planning Platform is about more than fostering interagency collaboration in capital investment planning - it’s about creating a digital platform for collaboration on the technologies that planners seek to do their jobs more effectively.</h3>
    <p>
        The data on this platform is not perfect; it is only as accurate and complete as existing data sources allow. The features of this platform are still in development, and we have a long list of improvements that we plan to make in the weeks and months to come. We are releasing this work-in-progress to our partners in City agencies because we believe that collaboration in platform development is just as important as the collaboration that the platform can engender in planning for a better NYC.
    </p>
    <p>
        We hope you will consider helping out in this effort. If you find data errors or know of better sources or have questions or suggestions about our <a href="http://docs.capitalplanning.nyc/facdb/" target="_blank" rel="noreferrer noopener">metadata</a>, please let us know. If you have ideas about new features that would support your agency’s planning work, we’d be happy to work to build them into the platform. If you can code, we’re building open source and encourage you to join us on <a href="https://github.com/nycplanning">GitHub</a>.
    </p>
    <p>
        We’re just at the beginning of this journey. Together, we can build a better platform, informing the decisions that build a better city.
    </p>
    <p>
        Email the team at <a href="mailto:capital@planning.nyc.gov">capital@planning.nyc.gov</a>.
    </p>
    <div className="modal-logo" />
  </div>
);

const Nav = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func.isRequired,
    auth: React.PropTypes.object.isRequired,
    title: React.PropTypes.string,
    children: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      title: '',
      children: null,
    };
  },

  showCollaborate() {
    this.props.showModal({
      modalHeading: 'Share',
      modalContent: collaborateContent,
      modalCloseText: 'Got it!',
    });
  },

  render() {
    const profile = AuthHelper.getProfile();

    const userMenu = AuthHelper.loggedIn() ? (
      <li className="dropdown">
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {profile.email}
          <span className="caret" />
        </a>

        <ul className="dropdown-menu">
          <li><a onClick={this.props.auth.logout}>Log Out</a></li>
        </ul>

      </li>

    ) :
    (<li><Link to="/login"><i className="fa fa-user" aria-hidden="true" /> Log In</Link></li>);


    return (
      <nav className={'navbar navbar-default navbar-fixed-top'}>
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">&#8291;</Link>
          <div className="navbar-title">
            Capital Planning Platform
            {(
              this.props.title &&
                <span className={'title'}> | {this.props.title}</span>
            )}
          </div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right ">
            <li><Link to="/"> Home</Link></li>
            {this.props.children}
            <li onClick={this.showCollaborate}><a> Collaborate</a></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScP9JxDvfCmMUxzT9l0_MRYBtTgeAep7pHYO5QUtrRCXGxVTw/viewform" target="_blank" rel="noopener noreferrer"> Send Feedback</a></li>
            {userMenu}
          </ul>
        </div>
      </nav>
    );
  },
});

module.exports = Nav;
