import React, { PropTypes } from 'react';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import Moment from 'moment';
import { Link } from 'react-router';

import auth from '../helpers/AuthHelper';
import { api_domain } from '../helpers/appConfig';

import './FeedbackPage.scss';

const FeedbackPage = React.createClass({

  propTypes: {
    params: PropTypes.object.isRequired,
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
    const style = {
      width: '100%',
      display: 'block',
      position: 'relative',
      boxSizing: 'border-box',
      marginBottom: '20px',
    };

    const feedback = this.state.data && this.state.data.map(d => (
      <Paper style={style} zDepth={1} className="feedback-item-container">
        <div className="feedback-item">
          <div className="meta">
            <div className="avatar">
              <i className="fa fa-user" aria-hidden="true" />
            </div>
            <div className="email">{d.email}</div>
            <div className="created-at">{Moment(d.createdAt).from(new Date())}</div>
          </div>
          <div className="comment">{d.comment}</div>
          <div className="item "><Link to={`/${d.ref_type}/${d.ref_id}`}>{d.ref_type} | {d.ref_id}</Link></div>
        </div>
      </Paper>
    ));

    return (
      <div className="fluid-content feedback-page">
        <div className="col-md-3" />
        <div className="col-md-6">
          {feedback}
        </div>
        <div className="col-md-3" />
      </div>
    );
  },
});

export default FeedbackPage;
