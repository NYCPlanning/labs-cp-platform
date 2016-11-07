import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'

import carto from './helpers/carto.js'


//object for the hierarchy of domains, groups and subgroups
//includes colors to be used in display
var layerStructure = [
  {
    name: 'Project Status',
    column: 'dcp_pipeline_status',
    children: [
      {
        name: 'Complete',
        color: '#ebebeb'
     
      },
      {
        name: 'Partial complete',
        color: '#ebebeb'
      },
      {
        name: 'Permit outstanding',
        color: '#ebebeb'
      },
      {
        name: 'Permit pending',
        color: '#ebebeb'
      }
    ]
  },
  {
    name: 'Type of Development',
    column: 'dcp_pipeline_category',
    children: [
      {
        name: 'Residential-New',
        color: '#ebebeb'
      },
      {
        name: 'Hotel-New',
        color: '#ebebeb'
      },
      {
        name: 'Residential-Alteration',
        color: '#ebebeb'
      },
      {
        name: 'Hotel-Alteration',
        color: '#ebebeb'
      }
    ]
  }
]

//to start, add checked = true to everything in the layerStructure object
layerStructure = layerStructure.map(function(domain) {
  domain.checked = true
  domain.children = domain.children.map(function(group) {
    group.checked = true
    return group
  })
  return domain
})


var LayerSelector = React.createClass({
  sqlChunks: {},

  getInitialState: function() {
    return ({
      layers:layerStructure,
      selectedCount: '__',
      totalCount:'__',
      dateFilter: false
    })
  },

  updateCounts() {
    var self=this

    /* get a count of "select all" from entire dataset */
    var SQL = 'SELECT * FROM nchatterjee.dob_permits_cofos_hpd_geocode' 
    var totalCountSQL = "SELECT count(*) as count FROM (" + SQL + ") a"

    carto.SQL(totalCountSQL, 'json')
      .then(function(data) {
        self.setState({
          selectedCount: data[0].count,
          totalCount: data[0].count
        })
      })
  },

  toggleCheckbox: function(type, domain, group, subgroup, e) {

    var layers = this.state.layers;

    //update state
    if(type=='subgroup') {
      
      layers[domain].children[group].children[subgroup].checked = !layers[domain].children[group].children[subgroup].checked

      this.processChecked(layers)

    } else if(type=='group') {

     

      var thisGroup = layers[domain].children[group]
       //figure out if new state is checked or not checked

      thisGroup.checked = !thisGroup.checked

      // thisGroup.children = thisGroup.children.map(function(child) {
      //   child.checked = thisGroup.checked 
      //   return child
      // })

    
      this.processChecked(layers)


    } else {
    
      var thisDomain = layers[domain]

      //toggle checked status
      thisDomain.checked = !thisDomain.checked

      //toggle all children and grandChildren
      thisDomain.children = thisDomain.children.map(function(group) {
        group.checked = thisDomain.checked
        // group.children = group.children.map(function(subgroup) {
        //   subgroup.checked = thisDomain.checked
        //   return subgroup
        // })
        return group
      })

      this.processChecked(layers)
    }



  },

  processChecked: function(layers) {
    console.log('processChecked')
    var self=this

    //set indeterminate states, start from the bottom and work up
    layers.map(function(domain) {
      var domainChecked=0
      //first set all the groups
      domain.children.map(function(group) {
        var groupChecked=0
        // group.children.map(function(subgroup) {
        //   if(subgroup.checked) groupChecked++
        // })

        //group.checked = (groupChecked==group.children.length) ? true : false
        //group.indeterminate = (groupChecked < group.children.length && groupChecked > 0) ? true : false

        if(group.checked) domainChecked++
      })

      domain.checked = (domainChecked==domain.children.length) ? true : false
      domain.indeterminate = (domainChecked < domain.children.length && domainChecked > 0) ? true : false

    })

    this.setState({
      layers: layers
    })


    var selectedLayers = []

    //push an object for each column to be filtered by, containing an array of currently selected values
    this.state.layers.map(function(domain) {
      console.log(domain)
      var columnSelected = {
        column: domain.column,
        selected: []
      }
      domain.children.map(function(group) {
        (group.checked) ? columnSelected.selected.push(group.name) : null
      })
      
     if (columnSelected.selected.length > 0) {
        var chunk = ''


        columnSelected.selected.map(function(value, i) {
          if(i>0) chunk += ' OR '
          chunk += columnSelected.column + ' = \'' + value + '\''
        })

        chunk = '(' + chunk + ')'

        self.sqlChunks[columnSelected.column] = chunk
      } else {
        self.sqlChunks[columnSelected.column] = 'FALSE'
      }

      if(!self.state.dateFilter) {
        delete self.sqlChunks.dob_cofo_date
      }
      

      self.buildSQL()


    })

    

  },

  getCount(sql) {
    var self=this
    
    var countSQL = 'SELECT count(a.*) as selected FROM ( ' + sql + ') a'

    carto.SQL(countSQL, 'json')
      .then(function(data) {
        self.setState({
          selectedCount: data[0].selected,
        })
      })
  },

  componentDidMount() {
    var self=this

    this.updateCounts() 

    $(this.refs.dateSlider).dateRangeSlider({
      enabled: false,
      bounds:{
        min: new Date('2011-1-1'),
        max: new Date()
      },
      defaultValues:{
        min: new Date('2011-1-1'),
        max: new Date()
      },
      step:{
        months: 1
      }
    });


    $(this.refs.dateSlider).bind("valuesChanged", function(e, data){  
      var dateRange = {
        min: data.values.min,
        max: data.values.max
      };

      var dateRangeFormatted = {
        min:Moment(dateRange.min).format('YYYY-MM-DD'),
        max:Moment(dateRange.max).format('YYYY-MM-DD')
      }

      if(self.state.dateFilter) {
        self.sqlChunks.dob_cofo_date = Mustache.render(
        'NOT (dob_cofo_date_first >= \'{{max}}\' OR dob_cofo_date_last <= \'{{min}}\')', dateRangeFormatted
        )
      } 
      
      self.buildSQL()
    });

    $(this.refs.unitsSlider).rangeSlider({
      bounds:{
        min: -309,
        max: 1669
      },
      defaultValues:{
        min: -309,
        max: 1669
      },
      step:10
    });

    $(this.refs.unitsSlider).bind("valuesChanged", function(e, data){ 
      var range = {
        min: data.values.min,
        max: data.values.max
      };

      self.sqlChunks.dcp_pipeline_units = Mustache.render('(dcp_units_use_map >= \'{{min}}\' AND dcp_units_use_map <= \'{{max}}\')', range)
      self.buildSQL()
    });
  },

  buildSQL: function() {

    var sqlTemplate = 'SELECT * FROM nchatterjee.dob_permits_cofos_hpd_geocode WHERE '
    console.log(this.sqlChunks)

    var chunksArray = []
    for (var key in this.sqlChunks) {
      chunksArray.push(this.sqlChunks[key])
    }


    var chunksString = chunksArray.join(' AND ')



    var sql = sqlTemplate + chunksString
    this.props.updateSQL(sql)
    this.getCount(sql)

  },

  toggleDateFilter: function() {

    if(!this.state.dateFilter) {
      $(this.refs.dateSlider).dateRangeSlider("option", "enabled", true);
      //filter complete and partially complete in the checkboxes
      var layers = this.state.layers 
      layers[0].children[2].checked = false  //disable permit outstanding
      layers[0].children[3].checked = false  //disable permit pending

      this.setState({
        layers: layers
      })

    } else {
      $(this.refs.dateSlider).dateRangeSlider("option", "enabled", false);
    }


    this.setState({
      dateFilter: !this.state.dateFilter
    }, () => {
      //trigger update
      this.processChecked(this.state.layers)
    })
  },

  render: function(){
    var self=this;
    return(
      <div>
        <div className='col-md-12'>
            <h3>Explore by Project Type and Status</h3>
        </div>
        <div className="col-md-12">  
          <div className="filter-count">
              {
                (this.state.selectedCount == this.state.totalCount) ? 
                  <span>Showing all {this.state.totalCount} Projects</span> :
                  <span>Showing {this.state.selectedCount} of {this.state.totalCount} projects</span>
              }
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
                    <a className="nav-container" style={{backgroundColor: domain.color}}>
                    <div onClick={self.toggleCheckbox.bind(self, 'domain', i, null, null)}>{domain.name}</div>
                    <div className="caret-container" data-toggle="collapse" data-parent="#stacked-menu" href={'#p' + (i)} ><span className="caret arrow"></span></div></a>    
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

                              <a className="nav-sub-container" style={{backgroundColor: domain.subColor}} onClick={self.toggleCheckbox.bind(self, 'group', i , j, null)}>    
                                {group.name}
                              </a>
                            </li>
                                
                        
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
          <h4>Number of Units</h4>
          <div id="unitsSlider" ref="unitsSlider"></div>
          <h4><Checkbox checked={this.state.dateFilter} onChange={this.toggleDateFilter}/> Completion Date*
            <br/>
            <small>*Filters to completed and partially completed projects</small>
          </h4>
          
          <div id="dateSlider" ref="dateSlider"></div>
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
   

