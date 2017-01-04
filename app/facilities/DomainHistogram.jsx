import React from 'react'
import { VictoryBar, VictoryChart } from 'victory';
import Subheader from 'material-ui/Subheader'
import {ListItem} from 'material-ui/List'

import Carto from '../helpers/carto.js'


var DomainHistogram = React.createClass({

  getInitialState() {
    return({
      data: null
    })
  },

  componentDidMount() {
    this.fetchData(this.props.sql)
  },

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.sql != this.props.sql) this.fetchData(nextProps.sql)
  },

  fetchData(sql) { 
    var self=this

    Carto.SQL(`SELECT count(*), domain FROM (${sql}) a WHERE domain IS NOT NULL GROUP BY domain ORDER BY domain ASC`, 'json')
      .then(function(data) {
        self.setState({
          data: data
        })
      })
  },

  render() {

    return(
      this.state.data && (
        <div>
          <Subheader>
            Facilities by Domain
          </Subheader>
            
            <VictoryBar
              data={this.state.data}
              x="domain"
              y="count"
              labels={(d) => d.count}
              style={{
                data: {
                  fill: (d) => {
                    console.log(d.domain)
                    return this.props.getColor(d.domain)
                  },
                  width: 400 / this.state.data.length 
                },
                labels: { fontSize: 20 },
                parent: { border: "1px solid #ccc" }
              }}
              
            />
           
      
        </div>
      )
    )
  }
})

module.exports = DomainHistogram
