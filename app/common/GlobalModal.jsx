import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal';

import './GlobalModal.scss';

const GlobalModal = (props) => {
  const { modalCloseText, modalHeading, modalContent } = props.modal || {};

  return (
    <Modal show={!!props.modal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {modalContent}
      </Modal.Body>

      <Modal.Footer>
        <div className="btn dcp-orange" onClick={props.closeModal}>
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

GlobalModal.defaultProps = {
  modal: null,
};

const mapStateToProps = ({ modal }) => ({ modal });

export default connect(mapStateToProps, { closeModal })(GlobalModal);
