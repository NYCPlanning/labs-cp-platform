import React from 'react'
import ReactDOM from 'react-dom'

//object for the hierarchy of domains, groups and subgroups
//includes colors to be used in display
var layerStructure = [
  {
    name: 'Administration of Government',
    color: '#8dd3c7',
    subColor: 'rgba(141, 211, 199, 0.29)',
    children: [
      {
        name: 'Offices',
        children: [
          {
            name: 'Offices'
          }
        ]
      },
      {
        name: 'Other Property',
        children: [
          {
            name: 'Miscellaneous Use'
          },
          {
            name: 'No Use'
          },
          {
            name: 'Undeveloped'
          }
        ]
      },
      {
        name: 'Parking, Maintenance, and Storage',
        children: [
          {
            name: 'Maintenance'
          },
          {
            name: 'Parking'
          },
          {
            name: 'Storage'
          }
        ]
      }
    ]
  },
  {
    name: 'Core Infrastructure and Transportation',
    color: '#ffff36',
    subColor: 'rgba(255, 255, 54, 0.29)',
    children: [
      {
        name: 'Transportation',
        children: [
          {
            name: 'Airports and Heliports'
          },
          {
            name: 'Bus Depots and Terminals'
          },
          {
            name: 'Parking Lots and Garages'
          },
          {
            name: 'Ports and Ferry Landings'
          },
          {
            name: 'Rail Yards and Maintenance'
          }
        ]
      },
      {
        name: 'Wastewater and Waste Management',
        children: [
          {
            name: 'Solid Waste Processing'
          },
          {
            name: 'Solid Waste Transfer and Carting'
          },
          {
            name: 'Wastewater Treatment Plant'
          }
        ]
      }
    ]
  },
  {
    name: 'Health Care and Human Services',
    color: '#bebada',
    subColor: 'rgba(190, 186, 218, 0.3)',
    children: [
      {
        name: 'Health Care',
        children: [
          {
            name: 'Chemical Dependency'
          },
          {
            name: 'Hospitals and Clinics'
          },
          {
            name: 'Mental Health'
          },
          {
            name: 'Other Health Care'
          },
          {
            name: 'Residential Health Care'
          }
        ]
      },
      {
        name: 'Human Services',
        children: [
          {
            name: 'Housing and Homeless Services'
          },
          {
            name: 'Legal and Intervention Services'
          },
          {
            name: 'Programs for People with Disabilities'
          },
          {
            name: 'Senior Services'
          },
          {
            name: 'Soup Kitchens and Food Pantries'
          },
          {
            name: 'Workforce Development'
          }
        ]
      }
    ]
  }, 
  {
    name: 'Parks, Cultural, and Other Community Facilities',
    color: '#fb8072',
    subColor: 'rgba(251, 128, 114, 0.3)',
    children: [
      {
        name: 'Cultural Institutions',
        children: [
          {
            name: 'Cultural Institutions'
          },
          {
            name: 'Historical Societies'
          },
          {
            name: 'Museums'
          },
          {
            name: 'Other Cultural Institutions'
          }
        ]
      },
      {
        name: 'Historical Sites',
        children: [
          {
            name: 'Historical Sites'
          }
        ]
      },
      {
        name: 'Libraries',
        children: [
          {
            name: 'Academic Libraries'
          },
          {
            name: 'Public Libraries'
          }
        ]
      },
      {
        name: 'Parks and Plazas',
        children: [
          {
            name: 'Cemeteries'
          },
          {
            name: 'Gardens'
          },
          {
            name: 'Parks'
          },
          {
            name: 'Preserves and Conservation Areas'
          },
          {
            name: 'Recreation and Waterfront Sites'
          },
          {
            name: 'Streetscapes, Plazas, and Malls'
          }
        ]
      }
    ]
  },
  {
    name: 'Public Safety, Emergency Services, and Administration of Justice',
    color: '#80b1d3',
    subColor: 'rgba(128, 177, 211, 0.3)',
    children: [
      {
        name: 'Emergency Services',
        children: [
          {
            name: 'Emergency Services'
          }
        ]
      },
      {
        name: 'Justice and Corrections',
        children: [
          {
            name: 'Courthouses and Judicial'
          },
          {
            name: 'Detention and Correctional'
          }
        ]
      },
      {
        name: 'Public Safety',
        children: [
          {
            name: 'Police Services'
          }
        ]
      }
    ]
  }, 
  {
    name: 'Youth, Education, and Child Welfare',
    color: '#fdb462',
    subColor: 'rgba(253, 180, 98, 0.3)',
    children: [
      {
        name: 'Camps',
        children: [
          {
            name: 'Camps'
          }
        ]
      },
      {
        name: 'Child Welfare',
        children: [
          {
            name: 'Child Nutrition'
          }
        ]
      },
      {
        name: 'Childcare',
        children: [
          {
            name: 'Childcare'
          }
        ]
      },
      {
        name: 'Childrens Services',
        children: [
          {
            name: 'Childrens Services'
          }
        ]
      },
      {
        name: 'Schools',
        children: [
          {
            name: 'Colleges or Universities'
          },
          {
            name: 'Non-public Schools'
          },
          {
            name: 'Other Schools Serving Students with Disabilities'
          },
          {
            name: 'Preschools'
          },
          {
            name: 'Proprietary Schools'
          },
          {
            name: 'Public Schools'
          }
        ]
      },
      {
        name: 'Youth Services',
        children: [
          {
            name: 'Youth Services'
          }
        ]
      },
    ]
  }
]

//to start, add checked = true to everything in the layerStructure object
layerStructure = layerStructure.map(function(domain) {
  domain.checked = true
  domain.children = domain.children.map(function(group) {
    group.checked = true
    group.children = group.children.map(function(subgroup) {
      subgroup.checked = true
      return subgroup
    })
    return group
  })
  return domain
})


var LayerSelector = React.createClass({

  getInitialState: function() {
    return ({
      layers:layerStructure
    })
  },

  toggleCheckbox: function(type, domain, group, subgroup, e) {

    var layers = this.state.layers;

    //update state
    if(type=='subgroup') {
      console.log('subgroup')
      
      layers[domain].children[group].children[subgroup].checked = !layers[domain].children[group].children[subgroup].checked

      this.processChecked(layers)

    } else if(type=='group') {

     

      var thisGroup = layers[domain].children[group]
       //figure out if new state is checked or not checked

      thisGroup.checked = !thisGroup.checked

      thisGroup.children = thisGroup.children.map(function(child) {
        child.checked = thisGroup.checked 
        return child
      })

    
      this.processChecked(layers)


    } else {
    
      var thisDomain = layers[domain]

      //toggle checked status
      thisDomain.checked = !thisDomain.checked

      //toggle all children and grandChildren
      thisDomain.children = thisDomain.children.map(function(group) {
        group.checked = thisDomain.checked
        group.children = group.children.map(function(subgroup) {
          subgroup.checked = thisDomain.checked
          return subgroup
        })
        return group
      })

      this.processChecked(layers)
    }



  },

  processChecked: function(layers) {

    //set indeterminate states, start from the bottom and work up
    layers.map(function(domain) {
      var domainChecked=0
      //first set all the groups
      domain.children.map(function(group) {
        var groupChecked=0
        group.children.map(function(subgroup) {
          if(subgroup.checked) groupChecked++
        })

        group.checked = (groupChecked==group.children.length) ? true : false
        group.indeterminate = (groupChecked < group.children.length && groupChecked > 0) ? true : false

        if(group.checked) domainChecked++
      })

      domain.checked = (domainChecked==domain.children.length) ? true : false
      domain.indeterminate = (domainChecked < domain.children.length && domainChecked > 0) ? true : false

    })

    this.setState({
      layers: layers
    })


    var selectedLayers = []

    this.state.layers.map(function(domain) {
      domain.children.map(function(group) {
        group.children.map(function(subgroup) {
          (subgroup.checked) ? selectedLayers.push(subgroup.name) : null
        })
      })
    })

    this.buildSQL(selectedLayers)

  },

  buildSQL(layers) {
    if (layers.length > 0) {
      var sql = 'SELECT * FROM table_20160930_facilitiesdraft WHERE '
      layers.map(function(name, i) {
        if(i>0) sql += ' OR '
        sql += 'facilitysubgroup = \'' + name + '\''
      })  
    } else {
      var sql ='SELECT * FROM table_20160930_facilitiesdraft LIMIT 0'
    }

    this.props.updateSQL(sql)
    
  },

  hideAll: function() {
    var layers = this.state.layers

    layers.map(function(domain) {
      domain.children.map(function(group) {
        group.children.map(function(subgroup) {
          (subgroup.checked) = false
        })
      })
    })

    this.processChecked(layers)
  },

  render: function(){
    var self=this;
    console.log('render', this.state.layers)
    return(
      <div className="col-md-12">
        <div className = 'row sidebar-header'>
          <div className='col-md-6'>
            <h3>Layers</h3>
          </div>
          <div className='col-md-6'>
            <div className='btn btn-default btn-sm pull-right' onClick={this.hideAll}>Hide All</div>
          </div>
        </div>
        
        <ul className="nav nav-pills nav-stacked" id="stacked-menu">
          { 
            this.state.layers.map(function(domain, i) {
              return(

                <li key={'domain' + i}>
                  <Checkbox 
                    value={domain.name} 
                    checked={domain.checked} 
                    indeterminate={domain.indeterminate}
                    onChange={self.toggleCheckbox.bind(self, 'domain', i, null, null)} />
                  <a className="nav-container" data-toggle="collapse" data-parent="#stacked-menu" href={'#p' + (i)} style={{backgroundColor: domain.color}}>
                  {domain.name}
                  <div className="caret-container"><span className="caret arrow"></span></div></a>    
                  <ul className="nav nav-pills nav-stacked collapse in" id={"p" + (i)} style={{height: 'auto'}}>
                  {
                    domain.children.map(function(group, j) {
                      return (
                          <div className="group nav nav-pills nav-stacked collapse in" key={j}>
                          <Checkbox 
                              value={group.name} 
                              checked={group.checked} 
                              indeterminate={group.indeterminate}
                              onChange={self.toggleCheckbox.bind(self, 'group', i , j, null)} />
                          <li data-toggle="collapse" data-parent={"#p" + (i)} href={'#pv' + i + j} >

                            <a className="nav-sub-container" style={{backgroundColor: domain.subColor}}>    
                              {group.name}
                              <div className="caret-container"><span className="caret arrow"></span></div>
                            </a>
                          </li>
                              
                            <ul className="nav nav-pills nav-stacked collapse" id={'pv' + i + j} style={{height: 'auto'}} >
                            {
                              group.children.map(function(subgroup, k) {
                                return(
                                  <li className='subgroup' key={k}>
                                    <a href="#">
                                      <Checkbox 
                                        value={subgroup.name} 
                                        checked={subgroup.checked} 
                                        indeterminate={false}
                                        onChange={self.toggleCheckbox.bind(self, 'subgroup',i, j, k)} />

                                      {subgroup.name}
                                    </a>
                                  </li>
                                )
                              })
                            } 
                            </ul>
                            </div>
                      ) 
                    })
                  }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
})

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

module.exports=LayerSelector
   

