import React from 'react'
import dc from 'dc'

var Component = React.createClass({
    getInitialState() {
        return {
            filtered: false
        }
    },

    componentDidMount: function() {
        var self =this;

        var container = this.refs.chartContainer

        var containerWidth = container.offsetWidth,
        containerHeight = container.offsetHeight;

        this.chart = dc.barChart(container)

        this.chart
        .margins(this.props.margins)
        .xAxisLabel(this.props.xAxisLabel)
        .yAxisLabel(this.props.yAxisLabel)
        .width(containerWidth)
        .height(100)
        .dimension(this.props.dimension)
        .group(this.props.group)
        .elasticY(true)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .colors(['#D96B27'])
        .yAxis()
        .ticks(3)

        this.chart.on('filtered', function(chart, filter) {
            self.setState({
                filtered: (filter == null) ? false : true
            })
            self.props.update() 
        })

        this.chart.render()
    },

    reset() {
        this.chart.filterAll()
        dc.redrawAll()
    },

    render() {
        return (
            <div className='widget'>
                <h4>{this.props.title}</h4>
                {(this.state.filtered) ? <div className='reset btn btn-sm btn-default' onClick={this.reset}>Reset</div> : null} 
                <div className={"dccolumnchart"} ref="chartContainer"/>
            </div>
        )    
    }

});

module.exports=Component;


