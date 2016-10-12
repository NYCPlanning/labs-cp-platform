import React from 'react'
import {Modal, Button} from 'react-bootstrap'

var Component = React.createClass({
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
    var closeText = this.props.closeText ? this.props.closeText : 'Close'

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
})

module.exports=Component