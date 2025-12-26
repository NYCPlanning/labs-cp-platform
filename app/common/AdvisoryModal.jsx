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
        <b>Important Update December 2025</b>: The Capital Planning Explorer is no longer being updated with the following datasets:
        <ul style={{ marginTop: '10px' }}>
          <li>Capital Projects and Plans</li>
          <li>Facilities and Program Sites</li>
          <li>New Housing Developments</li>
        </ul>
        The Department of City Planning will be decommissioning this data explorer in the coming months. For the most up-to-date information on Capital Projects and Plans, please visit our new <a href="https://capitalprojects.nycplanningdigital.com/" target="_blank">Capital Projects Portal</a>. For recent releases of <a href="https://data.cityofnewyork.us/City-Government/Facilities-Database/ji82-xba5/about_data" target="_blank">Facilities and Program Sites</a> or <a href="https://data.cityofnewyork.us/Housing-Development/Housing-Database/6umk-irkx/about_data" target="_blank">New Housing Developments</a> data, please refer to <a href="https://opendata.cityofnewyork.us/" target="_blank">NYC Open Data</a> or <a href="https://www.nyc.gov/content/planning/pages/resources" target="_blank">NYC Planning's Website</a>. Please feel free to contact us with any questions at <a href="mailto:CAPS@planning.nyc.gov" target="_blank">CAPS@planning.nyc.gov</a>.
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
