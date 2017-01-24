import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import reformed from 'react-reformed';
import $ from 'jquery';

const FeedbackForm = React.createClass({

  propTypes: {
    auth: PropTypes.object,
    setProperty: PropTypes.func,
    model: PropTypes.object,
    displayUnit: PropTypes.string.isRequired,
    ref_type: PropTypes.string.isRequired,
    ref_id: PropTypes.string.isRequired,
  },

  getInitialState() {
    return ({
      valid: false,
      submitted: false,
    });
  },

  onPostSuccess(data) {
    if (data.success) {
      this.setState({ submitted: true });
    }
  },

  onSubmit() {
    const data = this.props.model;

    const profile = this.props.auth.getProfile();

    // add user details to payload
    data.email = profile.email;
    data.user_id = profile.user_id;
    data.ref_type = this.props.ref_type;
    data.ref_id = this.props.ref_id;

    // get the json web token from localstorage
    const jwt = this.props.auth.getToken();

    $.ajax({
      url: 'http://localhost:3000/api/feedback/',
      type: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: this.onPostSuccess,
    });
  },

  onChangeInput(e) {
    // `setProperty` is injected by reformed
    this.props.setProperty(e.target.name, e.target.value);

    this.validate();
  },

  validate() {
    let valid = true;
    const m = this.props.model;

    if (m.comment && m.comment.length < 5) valid = false;

    this.setState({ valid });
  },

  render() {
    // model is injected by reformed
    const { model } = this.props;

    return (
      <Paper style={{ padding: '15px' }} zDepth={2}>
        <h4>Send Feedback about this {this.props.displayUnit}</h4>
        <p>Your comments can help us keep our data fresh!</p>

        { !this.state.submitted && (
          <div>
            <TextField
              name="comment"
              value={model.comment}
              floatingLabelText="Comments"
              multiLine
              rows={1}
              rowsMax={5}
              onChange={this.onChangeInput}
            />
            <br />
            <RaisedButton
              label="Submit"
              style={{ margin: 12 }}
              onTouchTap={this.onSubmit}
              disabled={!this.state.valid}
            />
          </div>
        )}

        { this.state.submitted && (
          <div>
            Thanks! We&apos;ll take a look at your comments shortly.
          </div>
        )}

      </Paper>
    );
  },
});

// Wrap your form in the higher-order component
export default reformed()(FeedbackForm);
