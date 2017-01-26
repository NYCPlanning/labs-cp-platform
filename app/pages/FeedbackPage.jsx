import React, { PropTypes } from 'react';
import $ from 'jquery';

import auth from '../helpers/AuthHelper';
import { api_domain } from '../helpers/appConfig';

const FeedbackPage = React.createClass({

  propTypes: {
    params: PropTypes.object,
  },

  getInitialState() {
    return ({ data: null });
  },

  componentDidMount() {
    const jwt = auth.getToken();

    $.ajax({
      url: `//${api_domain}/api/feedback/list/${this.props.params.type}`,
      type: 'GET',
      headers: { Authorization: `Bearer ${jwt}` },
      success: (data) => {
        this.setState({ data });
      },
    });
  },

  render() {
    const feedback = this.state.data && this.state.data.map(d => (
      <div>
        <div>{d.email}</div>
        <div>{d.comment}</div>
      </div>
    ));

    return (
      <div className="col-md-12 fluid-content">
        {feedback}
      </div>
    );
  },
});

export default FeedbackPage;
