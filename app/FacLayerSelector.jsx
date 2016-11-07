import React from 'react'
import ReactDOM from 'react-dom' 
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import Numeral from 'numeral'


var LayerSelector = React.createClass({

  /* SETTING INITIAL STATE */

  getInitialState() {
    return ({
      layers: null,
      selectedCount: '__',
      totalCount:'__',
      checked: 'all' //all, none, or null
    })
  },

  componentWillMount() {
    /* interates through each domain in the layerStructure object */
    /* to start, add checked = true to everything in the layerStructure object */
    var layerStructure = this.props.layerStructure.map(function(domain) {
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

    this.setState({
      layers: layerStructure
    })
  },

  /*checks to see if there is only one domain.*/
  /*if it's a domain subset page (only one domain), expands all and then requests that count be updated*/
  componentDidMount() {
    if(this.props.layerStructure.length == 1) {
      this.expandAll()
    }
    this.updateCounts() 
  },

  /*NEED TO FIND ANOTHER WAY TO CHECK IF IT'S A SUBSET*/

  
  updateCounts() {
    var self=this

    /* get a count of "select all" from entire dataset */
    var SQL = encodeURI(this.props.initialSQL) /* where does initial SQL get defined? */
    var totalCountSQL = "SELECT count(*) as total FROM (" + SQL + ") a"

    this.cartoSQLCall(totalCountSQL, function(data) {
      var total = data.rows[0].total

      total = Numeral(total).format('0,0')
      
      self.setState({
        selectedCount: total,
        totalCount: total
      })
    })
  },

  cartoSQLCall(sql, cb) {
     var apiCall = 'https://carto.capitalplanning.nyc/user/hkates/api/v2/sql?q=' + sql
     $.getJSON(apiCall, cb)
  },

  toggleCheckbox(type, domain, group, subgroup, e) {

    var layers = this.state.layers;

    //update state
    if(type=='subgroup') {
      
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
  processChecked(layers) {

    var allChecked = 0,
      allIndeterminate = 0
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
      domain.checked ? allChecked++ : null
      domain.indeterminate = (domainChecked < domain.children.length && domainChecked > 0) ? true : false
      domain.indeterminate ? allIndeterminate++ : null
    })
    var checkedStatus
    //figure out whether all, none, or some are checked
    if(allChecked == layers.length) {
      checkedStatus = 'all'
    } else if (allChecked == 0 && allIndeterminate == 0) {
      checkedStatus = 'none'
    } else {
      checkedStatus = null
    }

    this.setState({
      layers: layers,
      checked: checkedStatus
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
      var sql = 'SELECT * FROM facilities_data WHERE '
      layers.map(function(name, i) {
        if(i>0) sql += ' OR '
        sql += 'facilitysubgroup = \'' + name + '\''
      })  
    } else {
      var sql ='SELECT * FROM facilities_data LIMIT 0'
    }

    this.props.updateSQL(sql)
    this.getCount(sql)
  },

  getCount(sql) {
    var self=this
    
    var countSQL = 'SELECT count(a.*) as selected FROM ( ' + sql + ') a'

    this.cartoSQLCall(countSQL, function(data) {
      var selected = data.rows[0].selected

      selected = Numeral(selected).format('0,0')
      
      self.setState({
        selectedCount: selected
      })
    })
  },

  showAll() {
    var layers = this.state.layers

    layers.map(function(domain) {
      domain.children.map(function(group) {
        group.children.map(function(subgroup) {
          (subgroup.checked) = true
        })
      })
    })

    this.processChecked(layers)
  },

  hideAll() {
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

  expandAll() {
    //geez, just do it with jQuery
    $('.caret-container.collapsed').click()
  },

  collapseAll() {
    $('.caret-container:not(.collapsed)').click()
  },

  render() {
    var self=this;

    return(
      <div className="col-md-12">
        <div className='row sidebar-content'>
          <div className='col-md-12'>
            <h3>Explore by Facility Types</h3>
    
            <p>
              Select facility types to display on the map. 
              <OverlayTrigger placement="top" overlay={ <Tooltip id="tooltip"> Learn more about facility types</Tooltip>}>
                <a href="https://nycplanning.github.io/cpdocs/facdb/"> <i className="fa fa-info-circle" aria-hidden="true"></i></a>
              </OverlayTrigger>
            </p>
            
          </div>

          <div className="col-md-12">
            <div className="filter-count">
              {
                (this.state.selectedCount == this.state.totalCount) ? 
                  <span>Showing all {this.state.totalCount} Facilities</span> :
                  <span>Showing {this.state.selectedCount} of {this.state.totalCount} facilities</span>
              }
            </div>
              <div className="btn-group btn-group-xs" role="group">
                <div className='btn dcp-orange btn-xs ' onClick={this.showAll} disabled={this.state.checked == 'all'}>Select All</div>
                <div className='btn dcp-orange btn-xs ' onClick={this.hideAll} disabled={this.state.checked == 'none'}>Select None</div>
              </div>
              <br/>
              <div className="btn-group btn-group-xs" role="group">
                <div className='btn dcp-orange btn-xs ' 
                onClick={this.expandAll} >Expand All</div>
                <div className='btn dcp-orange btn-xs ' onClick={this.collapseAll}>Collapse All</div>
              </div>
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
                  <a className="nav-container" style={{backgroundColor: self.props.layerStructure.length == 1 ? 'rgb(224, 224, 224)' : domain.color}}>
                  <div onClick={self.toggleCheckbox.bind(self, 'domain', i, null, null)} style={{'display':'inline-block', 'width': '240px'}}>{domain.name}</div>
                  <div className="caret-container collapsed" data-toggle="collapse" data-parent="#stacked-menu" href={'#p' + (i)}><span className="caret arrow"></span></div></a>    
                  <ul className="group-container nav nav-pills nav-stacked collapse" id={"p" + (i)} style={{height: 'auto'}}>
                  {
                    domain.children.map(function(group, j) {
                      return (
                          <div className="group nav nav-pills nav-stacked collapse in" key={j}>
                          <Checkbox 
                              value={group.name} 
                              checked={group.checked} 
                              indeterminate={group.indeterminate}
                              onChange={self.toggleCheckbox.bind(self, 'group', i , j, null)} />
                          <li>

                            <a className="nav-sub-container" style={{backgroundColor: self.props.layerStructure.length == 1 ? group.color: domain.subColor}}>    
                              <div onClick={self.toggleCheckbox.bind(self, 'group', i , j, null)} style={{'color':'black'}}>
                                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">{group.description}</Tooltip>}>
                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                </OverlayTrigger>
                                {group.name}
                              </div>
                              <div className="caret-container collapsed" data-toggle="collapse" data-parent={"#p" + (i)} href={'#pv' + i + j} style={{'color':'black'}}><span className="caret arrow"></span></div>
                            </a>
                          </li>
                              
                            <ul className="subgroup-container nav nav-pills nav-stacked collapse" id={'pv' + i + j} style={{height: 'auto'}} >
                            {
                              group.children.map(function(subgroup, k) {
                                return(
                                  <li className='subgroup' key={k}>
                                  <Checkbox 
                                        value={subgroup.name} 
                                        checked={subgroup.checked} 
                                        indeterminate={false}
                                        onChange={self.toggleCheckbox.bind(self, 'subgroup',i, j, k)} />
                                    <a onClick={self.toggleCheckbox.bind(self, 'subgroup',i, j, k)} style={{'color':'black'}}>
                                      <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">{subgroup.description}</Tooltip>}>
                                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                                      </OverlayTrigger>
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
        <div className='sidebar-buttons'>
          <a href="/facilities"><div className='btn btn-sm dcp-orange' > <i className="fa fa-arrow-left" aria-hidden="true"></i> Back to Facilities Home</div><br/></a>
          <a href="/facilities/all"><div className='btn btn-sm dcp-orange' > <i className="fa fa-map-marker" aria-hidden="true"></i> All Facilities Map</div></a>
        </div>
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
   

