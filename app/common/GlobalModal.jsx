// GlobalModal.jsx - A react-bootstrap modal that can be quickly composed
// Props:
//  heading - A string to be used in the header
//  body - JSX to be inserted into the body of the modal
//  closeText - A string to be used in the close button

import React from 'react';
import { Modal } from 'react-bootstrap';

import './GlobalModal.scss';

const GlobalModal = React.createClass({
  propTypes: {
    closeText: React.PropTypes.string,
    heading: React.PropTypes.string.isRequired,
    body: React.PropTypes.element.isRequired,
  },

  getDefaultProps() {
    return {
      closeText: 'Close',
    };
  },

  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const closeText = this.props.closeText ? this.props.closeText : 'Close';

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <div className="btn dcp-orange" onClick={this.close}>{closeText}</div>
        </Modal.Footer>
      </Modal>
    );
  },
});

module.exports = GlobalModal;
