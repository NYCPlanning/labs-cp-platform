import React from 'react'
import ReactDOM from 'react-dom'


//object for the hierarchy of domains, groups and subgroups
//includes colors to be used in display
var layerStructure = [
  {
    name: 'Project Status',
    column: 'dcp_pipeline_status',
    children: [
      {
        name: 'Recently completed',
        color: '#ebebeb'
     
      },
      {
        name: 'Partial complete',
        color: '#ebebeb'
      },
      {
        name: 'Permit pending',
        color: '#ebebeb'
      },
      {
        name: 'Permitted',
        color: '#ebebeb'
      }
    ]
  },
  {
    name: 'Pipeline Category',
    column: 'dcp_pipeline_category',
    color: '#ebebeb',
    subColor: '#ebebeb',
    children: [
      {
        name: 'Residential New'
      },
      {
        name: 'Residential New - Hotel'
      },
      {
        name: 'Residential renovation'
      }
    ]
  }
]

//to start, add checked = true to everything in the layerStructure object
layerStructure = layerStructure.map(function(domain) {
  domain.checked = true
  domain.children = domain.children.map(function(group) {
    group.checked = true
    // group.children = group.children.map(function(subgroup) {
    //   subgroup.checked = true
    //   return subgroup
    // })
    return group
  })
  return domain
})


var LayerSelector = React.createClass({
  sqlChunks: {},

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
        console.log(chunk)

        self.sqlChunks[columnSelected.column] = chunk
      } 

      self.buildSQL()


    })

    

  },

  componentDidMount() {
    var self=this

    $(this.refs.dateSlider).dateRangeSlider({
      bounds:{
        min: new Date('2012-10-1'),
        max: new Date()
      },
      defaultValues:{
        min: new Date('2012-10-10'),
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
        min:moment(dateRange.min).format('YYYY-MM-DD'),
        max:moment(dateRange.max).format('YYYY-MM-DD')
      }

      self.sqlChunks.dob_co_date = Mustache.render('((dob_co_date >= \'{{min}}\' AND dob_co_date <= \'{{max}}\') OR (dob_co_date IS NULL))', dateRangeFormatted)
      self.buildSQL()
    });

    $(this.refs.unitsSlider).rangeSlider({
      bounds:{
        min: -262,
        max: 1432
      },
      defaultValues:{
        min: -262,
        max: 1432
      },
      step:10
    });

    $(this.refs.unitsSlider).bind("valuesChanged", function(e, data){  
      var range = {
        min: data.values.min,
        max: data.values.max
      };

      self.sqlChunks.dcp_pipeline_units = Mustache.render('(dcp_pipeline_units >= \'{{min}}\' AND dcp_pipeline_units <= \'{{max}}\')', range)
      self.buildSQL()
    });
  },

  buildSQL: function() {
    console.log(this.sqlChunks)

    var sqlTemplate = 'SELECT * FROM residential_pipeline_100416_v1_users WHERE '


    var chunksArray = []
    for (var key in this.sqlChunks) {
      chunksArray.push(this.sqlChunks[key])
    }


    var chunksString = chunksArray.join(' AND ')



    var sql = sqlTemplate + chunksString
    console.log(sql)
    console.log('Setting SQL to ' + sql);
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
            <h3>Filters</h3>
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
        <h4>Completion Date*<small>Applies to completed and partially completed projects only</small></h4>
          <div id="dateSlider" ref="dateSlider"></div>
          <h4>Number of Units</h4>
          <div id="unitsSlider" ref="unitsSlider"></div>
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
   

