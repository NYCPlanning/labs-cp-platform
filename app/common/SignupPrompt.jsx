import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import AuthService from '../helpers/AuthService';


const SignupPrompt = () => (
  <div>
    <h4>Like what you see?</h4>

    <p>We are updating the data and features on this explorer regularly. Sign up to learn about updates and keep your data fresh.</p>

    <RaisedButton
      style={{ float: 'right' }}
      label="Sign Up"
      labelPosition="before"
      onTouchTap={() => {
        AuthService.signup();
      }}
    />
  </div>
);


export default SignupPrompt;
