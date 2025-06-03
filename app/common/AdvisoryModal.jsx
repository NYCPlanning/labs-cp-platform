import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const AdvisoryModal = ({ handleClose }) => (
  <Modal
    show
    onHide={handleClose}
    style={{ top: '5em' }}
  >
    <Modal.Header
      className="advisory-modal-header"
      style={{ paddingTop: '45px' }}
    />

    <Modal.Body>
      <div style={{ margin: '0 3em', fontSize: '18px' }}>
        The Capital Projects section of the Capital Planning Explorer is no
        longer being updated with the latest data (the most recent data
        available in this application are from April 2023). To download the
        latest Capital Projects data, please refer to&nbsp;
        <a href="https://data.cityofnewyork.us/City-Government/Capital-Projects-Database-CPDB-Projects/fi59-268w/about_data">
          NYC Open Data
        </a>
        &nbsp;or&nbsp;
        <a href="https://www.nyc.gov/content/planning/pages/resources#datasets">
          Bytes of the Big Apple
        </a>
        . Other sections of the Capital Planning Explorer are still being
        actively updated, and we encourage you to stay tuned for future
        enhancements to this platform.
      </div>
    </Modal.Body>

    <Modal.Footer className="advisory-modal-footer">
      <div className="btn dcp-orange" onClick={handleClose}>
        Close
      </div>
    </Modal.Footer>
  </Modal>
);

AdvisoryModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AdvisoryModal;
