import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

const SignupPrompt = ({ signUp }) => (
  <div>
    <h4>Like what you see?</h4>

    <p>We are updating the data and features on this explorer regularly. Sign up to learn about updates and keep your data fresh.</p>

    <RaisedButton
      label="Sign Up"
      labelPosition="before"
      onTouchTap={signUp}
    />
  </div>
);

export default connect(null, {
  signUp: authActions.signUp
})(SignupPrompt);
