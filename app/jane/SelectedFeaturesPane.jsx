import React from 'react'

const SelectedFeauturesPane = React.createClass({

  render() {
    return (
      <div className='jane-selected-features' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }

})

export default SelectedFeauturesPane