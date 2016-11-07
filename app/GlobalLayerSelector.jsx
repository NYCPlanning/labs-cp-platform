import React from 'react'
import ReactDOM from 'react-dom'

var Component = React.createClass({
  getInitialState() {
    return({
      layers: [
        {
          name: "facilities",
          displayName: "Facilities",
          checked: false
        },
        {
          name: "pipeline",
          displayName: 'Pipeline',
          checked: false
        }
      ]
    })
  },

  toggleCheckbox(i) {
    this.state.layers[i].checked = !this.state.layers[i].checked
    this.setState({
      layers: this.state.layers
    })


    var selectedLayers = []
    this.state.layers.map(function(layer) {
      if(layer.checked) {
        selectedLayers.push(layer.name)
      }
    })

    this.props.onUpdate(selectedLayers)

  },

  render() {
    var self=this

    var layerSelectors = this.state.layers.map(function(layer, i) {
      return (
        <div key={i}>
          <Checkbox 
            value={layer.name} 
            checked={layer.checked} 
            onChange={self.toggleCheckbox.bind(self, i)} /> {layer.displayName}
        </div>
      )
    })

    return(
      <div>
        {layerSelectors}
      </div>
    )
  }
})

module.exports=Component

var Checkbox = React.createClass({
  render: function() {
    var self=this
    return(
      <input type="checkbox" 
        value={this.props.value} 
        checked={this.props.checked} 
        onChange={this.props.onChange}
        ref={
          function(input) {
            if (input != null) {
              ReactDOM.findDOMNode(input).indeterminate = self.props.indeterminate
            }
          }
        }
      />
    )
  }
})