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
    console.log('render modal', this.props)

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
            <Button onClick={this.close}>{closeText}</Button>
          </Modal.Footer>
        </Modal>
    );
  }
})

module.exports=Component