
import React from 'react'


const FacilitiesWrapper = React.createClass({

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  },

  render() {

    let children = null;
    //pass auth and global modal down the line
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
        showModal: this.showModal 
      })
    }

    let { location } = this.props

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div>
        <h1>Pinterest Style Routes</h1>

        <div>
          {isModal ?
            this.previousChildren :
            children
          }

          {isModal && (
            <Modal isOpen={true} returnTo={location.state.returnTo}>
              {children}
            </Modal>
          )}
        </div>
      </div>
    )
  }
})

module.exports = FacilitiesWrapper