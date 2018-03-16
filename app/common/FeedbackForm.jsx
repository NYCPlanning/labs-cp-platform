import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackForm extends React.Component {
  link = () => {
    const baseURL = `https://airtable.com/shrw2fjkT7bZvb67f?prefill_ref_id=${this.props.ref_id}&prefill_ref_type=${this.props.ref_type}&prefill_Type=Data%20issue`;
    if (this.props.profile) { return `${baseURL}&prefill_Email=${this.props.profile.email}`; }
    return baseURL;
  }

  render() {
    return (
      <a 
        href={this.link()}
        style={{ marginBottom: '30px', textAlign: 'center' }}
        target="_blank"
        type="button"
        className="btn btn-warning btn-sm btn-block"
      >
        Something wrong with this data? Suggest an Edit
      </a>
    );
  }
}

FeedbackForm.propTypes = {
  ref_type: PropTypes.string.isRequired,
  ref_id: PropTypes.string.isRequired,
  profile: PropTypes.object,
};

FeedbackForm.defaultProps = {
  profile: {},
};

const mapStateToProps = ({ currentUser }) => ({
  profile: currentUser.profile,
});

// Wrap your form in the higher-order component
export default connect(mapStateToProps)(FeedbackForm);
