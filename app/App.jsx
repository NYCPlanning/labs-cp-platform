import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';

import * as authActions from './actions/auth';

// get styles for jane-maps
import 'jane-maps/dist/styles.css';

import GlobalModal from './common/GlobalModal';
import Nav from './common/Nav';

import './app.scss';

injectTapEventPlugin();

class App extends React.Component {
  componentWillMount() {
    this.props.loadCredentials({ targetPath: location.pathname });
  }

  render() {
    document.title = this.props.children.props.route.title || 'NYC Capital Planning Platform';

    return (
      <div>
        <Nav
          title={this.props.children.props.route.title}
          about={this.props.children.props.route.about ? this.props.children.props.route.about : '/about'}
          mini={this.props.children.props.route.miniNav}
        />
        <div>
          <GlobalModal />

          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape().isRequired,
  children: PropTypes.element.isRequired,
  route: PropTypes.shape().isRequired,
};

export default connect(null, {
  loadCredentials: authActions.loadCredentials
})(App);
