// Sample.jsx - A Sample Component that meets the formatting and structure standards for our app that you can use as a template a new Component
//Start with a brief description of what this component does, and a listing of Props that the component expects:

// Required Props:
// prop1 - some description

// Optional Props:
// prop2 - some description


//for imports, group into dependencies, Components, and helper files, seperate by one space
import React from 'react'
import Mustache from 'mustache'

import SomeComponent from './SomeComponent.jsx'
import SomeOtherComponent from './SomeOtherComponent.jsx'

import someHelper from './helpers/somehelper.jsx'

//use React.CreateClass(), not extends Component
//order properties by variables, all other react lifecycle methods, custom methods, render method.
var Component = React.createClass({
  getInitialState() {
    return({
      someProperty: 'someValue'
    })
  },

  myCustomMethod(input) {
    return input * 2
  },

  render() {
    return(
      <div>
       Stuff
      </div>
    )
  }
})

//loose variables that get used in the component should go after the component class definition
var someData = {
  property1: 'somevalue',
  propert2: 'somevalue'
}

//module.exports should be the last line
module.exports=Component