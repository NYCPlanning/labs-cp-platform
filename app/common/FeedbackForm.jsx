import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import reformed from 'react-reformed';

import appConfig from '../helpers/appConfig';
import AuthService from '../helpers/AuthService';

const FeedbackForm = createReactClass({

  propTypes: {
    setProperty: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    ref_type: PropTypes.string.isRequired,
    ref_id: PropTypes.string.isRequired,
  },

  getInitialState() {
    return ({
      valid: false,
      submitted: false,
      error: false,
    });
  },

  onPostSuccess(data) {
    if (data.success) {
      this.setState({ submitted: true });
    }
  },

  onPostError() {
    this.setState({ error: true });
  },

  onSubmit() {
    // if not logged in, prompt login and pass current model up
    if (!AuthService.loggedIn()) {
      AuthService.login();
    } else {
      this.postData();
    }
  },

  onChangeInput(e) {
    // `setProperty` is injected by reformed
    this.props.setProperty(e.target.name, e.target.value);
  },

  postData() { // TODO move ajax to a helper class
    const data = this.props.model;

    const profile = AuthService.getProfile();

    // add user details to payload
    // check if username exists, set to null if not
    data.username = profile.username ? profile.username : null;
    data.user_id = profile.user_id;
    data.ref_type = this.props.ref_type;
    data.ref_id = this.props.ref_id;

    // get the json web token from localstorage
    const jwt = AuthService.getToken();

    $.ajax({ // eslint-disable-line no-undef
      url: `//${appConfig.api_domain}/feedback/`,
      type: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: this.onPostSuccess,
      error: this.onPostError,
    });
  },

  render() {
    // model is injected by reformed
    const { model } = this.props;

    let valid = true;

    if (!model.comment || model.comment.length < 5) valid = false;

    return (
      <div>
        { !this.state.submitted && !this.state.error && (
          <div>
            <h4>Suggest an Edit</h4>
            <p>See something wrong with this data point? Let us know.</p>
            <TextField
              name="comment"
              value={model.comment}
              floatingLabelText="Write Here"
              multiLine
              rows={1}
              rowsMax={5}
              onChange={this.onChangeInput}
            />
            <br />
            <RaisedButton
              label="Submit"
              style={{ marginTop: 12 }}
              onTouchTap={this.onSubmit}
              disabled={!valid}
            />
          </div>
        )}

        { this.state.submitted && (
          <div>
            <p>Thanks for helping us keep the data fresh! We will review your feedback and take appropriate action</p>
          </div>
        )}

        { this.state.error && (
          <div>
            <p>Oops! Something went wrong and we were not able to save your feedback.  Please try again later.</p>
          </div>
        )}

      </div>
    );
  },
});

// Wrap your form in the higher-order component
export default reformed()(FeedbackForm);
