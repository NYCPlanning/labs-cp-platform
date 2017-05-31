// GlobalModal.jsx - A react-bootstrap modal that can be quickly composed
// Props:
//  heading - A string to be used in the header
//  body - JSX to be inserted into the body of the modal
//  closeText - A string to be used in the close button

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import './GlobalModal.scss';

class GlobalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

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
  }
}

GlobalModal.defaultProps = {
  closeText: 'Close',
};

GlobalModal.propTypes = {
  closeText: PropTypes.string,
  heading: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
};

module.exports = GlobalModal;
