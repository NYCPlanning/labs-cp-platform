import React from 'react'
import Select from 'react-select'




function logChange(val) {
    console.log("Selected: " + val);
}


var AgencySelector = React.createClass({

  getInitialState() {
    return {
      value: []
    }
  },

  handleChange(values) {
    //before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component

    var abbreviated = values.map(function(value) {
      return {
        value: value.value,
        label: value.value
      }
    })

    this.setState({
      values: abbreviated
    })

    this.props.updateFilters(values)
  },


  render() {
    return(
      <div className="col-md-12">
        <div className="row sidebar-content">
          <div className="col-md-12">
            <h3>Filter by Sponsor Agency</h3>
            <Select
              multi
              value={this.state.values}
              name="form-field-name"
              options={options}
              onChange={this.handleChange}
              onInputChange={this.changeInput}
            />
          </div>
        </div>
      </div>
    )
  }
})

module.exports=AgencySelector

var options = [  
   {  
      "value":"ACS",
      "label":"Administration for Children's Services"
   },
   {  
      "value":"BBPC",
      "label":"Brooklyn Bridge Park Corporation - BBPC"
   },
   {  
      "value":"BNYDC",
      "label":"Brooklyn Navy Yard Development Corportation - BNYDC"
   },
   {  
      "value":"BOE",
      "label":"Board of Elections - BOE"
   },
   {  
      "value":"BPL",
      "label":"Brooklyn Public Library - BPL"
   },
   {  
      "value":"CME",
      "label":"Office of the Chief Medical Examiner - CME"
   },
   {  
      "value":"Courts",
      "label":"New York State Unified Court System - Courts"
   },
   {  
      "value":"CUNY",
      "label":"City University of New York - CUNY"
   },
   {  
      "value":"DCAS",
      "label":"Department of Citywide Administrative Services"
   },
   {  
      "value":"DCLA",
      "label":"Department of Cultural Affairs - DCLA"
   },
   {  
      "value":"DCP",
      "label":"Department of City Planning - DCP"
   },
   {  
      "value":"DDC",
      "label":"Department of Design and Construction - DDC"
   },
   {  
      "value":"DEP",
      "label":"Department of Environmental Protection - DEP"
   },
   {  
      "value":"DFTA",
      "label":"Department for the Aging - DFTA"
   },
   {  
      "value":"DHP",
      "label":"Department of Housing, Preservation, and Development - DHP"
   },
   {  
      "value":"DHS",
      "label":"Department of Homeless Services - DHS"
   },
   {  
      "value":"DJJ",
      "label":"Department of Juvenile Justice - DJJ"
   },
   {  
      "value":"DOC",
      "label":"Department of Corrections - DOC"
   },
   {  
      "value":"DOE",
      "label":"Department of Education - DOE"
   },
   {  
      "value":"DOHMH",
      "label":"Department of Health and Mental Hygiene - DOHMH"
   },
   {  
      "value":"DOI",
      "label":"Department of Investigation - DOI"
   },
   {  
      "value":"DOT",
      "label":"Department of Transportation - DOT"
   },
   {  
      "value":"DPR",
      "label":"Department of Parks and Recreation - DPR"
   },
   {  
      "value":"DSNY",
      "label":"Department of Sanitation - DNSY"
   },
   {  
      "value":"EDC",
      "label":"Economic Development Corportation - EDC"
   },
   {  
      "value":"FDNY",
      "label":"Fire Department - FDNY"
   },
   {  
      "value":"HHC",
      "label":"Health and Hospitals Corporation - HHC"
   },
   {  
      "value":"HRA",
      "label":"Human Resources Administration - HRA"
   },
   {  
      "value":"Miscellaneous",
      "label":1
   },
   {  
      "value":"MO",
      "label":"Mayor's Office - MO"
   },
   {  
      "value":"Non-City",
      "label":"Non-City Agencies"
   },
   {  
      "value":"NYCHA",
      "label":"New York City Housing Authority - NYCHA"
   },
   {  
      "value":"NYPD",
      "label":"Police Department - NYPD"
   },
   {  
      "value":"NYPL",
      "label":"New York Public Library - NYPL"
   },
   {  
      "value":"NYS",
      "label":"New York State - NYS"
   },
   {  
      "value":"ORR",
      "label":"Office of Recovery and Resilliency - ORR"
   },
   {  
      "value":"QBPL",
      "label":"Queens Borough Public Library - QBPL"
   },
   {  
      "value":"SBS",
      "label":"Department of Small Business Services - SBS"
   },
   {  
      "value":"SCA",
      "label":"School Construction Authority - SCA"
   },
   {  
      "value":"TGI",
      "label":"Trust for Governor's Island"
   }
]