// GlobalModal.jsx - A react-bootstrap modal that can be quickly composed
// Props:
//  heading - A string to be used in the header
//  body - JSX to be inserted into the body of the modal
//  closeText - A string to be used in the close button

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal';

import './GlobalModal.scss';

const GlobalModal = ({ modal, closeModal }) => {
  const { modalCloseText, modalHeading, modalContent } = modal || {};

  return (
    <Modal show={!!modal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {modalContent}
      </Modal.Body>

      <Modal.Footer>
        <div className="btn dcp-orange" onClick={closeModal}>
          {modalCloseText || 'Close'}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

GlobalModal.propTypes = {
  modal: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ modal }) => ({ modal });

export default connect(mapStateToProps, { closeModal })(GlobalModal);
