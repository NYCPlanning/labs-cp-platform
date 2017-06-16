import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import store from './store';

// get styles for jane-maps, TODO figure out the best way to include this
import 'jane-maps/dist/styles.css';

import GlobalModal from './common/GlobalModal';
import Nav from './common/Nav';

import './app.scss';

injectTapEventPlugin();

// set material ui default styles
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#b1b1b1',
    accent1Color: '#D96B27',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };
  }

  render() {
    document.title = this.props.children.props.route.title || 'NYC Capital Planning Platform';

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
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
        </MuiThemeProvider>
      </Provider>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape().isRequired,
  children: PropTypes.element.isRequired,
  route: PropTypes.shape().isRequired,
};

export default App;
