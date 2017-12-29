import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import NestedSelect from './NestedSelect';
import getDefaultFilterDimensions from './config';
import ga from '../helpers/ga';


import './SplashSelector.scss';

const ThisSelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      style: PropTypes.object,
      selectedIndex: PropTypes.number.isRequired,
      onChange: PropTypes.func,
    };

    static defaultProps = {
      style: {},
      onChange: () => null,
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.selectedIndex,
      });
    }

    handleRequestChange = (event, index) => {
      this.props.onChange(index);
    };

    render() {
      return (
        <ComposedComponent
          value={this.props.selectedIndex}
          onChange={this.handleRequestChange}
          style={this.props.style}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

const SelectableList = wrapState(ThisSelectableList);


class SplashSelector extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      noneSelected: true,
    };
  }

  componentWillMount() {
    this.setState({ layers: getDefaultFilterDimensions({ selected: 'none' }).facsubgrp.values });
  }

  handleIndexChange = (index) => {
    this.setState({ selectedIndex: index });
  };

  handleSelectUpdate = () => {
    this.processChecked();
  };

  // set indeterminate states, check/uncheck children, etc
  processChecked = () => {
    const layers = this.state.layers;
    let noneSelected = true;

    // set indeterminate states, start from the bottom and work up
    layers.forEach((facdomain) => {
      let facdomainChecked = 0;
      let facdomainIndeterminate = 0;

      facdomain.children.forEach((group) => {
        let groupChecked = 0;

        group.children.forEach((subgroup) => {
          if (subgroup.checked) {
            groupChecked += 1;
            noneSelected = false;
          }
        });

        group.checked = (groupChecked === group.children.length);
        group.indeterminate = (groupChecked < group.children.length) && groupChecked > 0;

        if (group.checked) facdomainChecked += 1;
        if (group.indeterminate) facdomainIndeterminate += 1;
      });

      facdomain.checked = (facdomainChecked === facdomain.children.length);
      facdomain.indeterminate = (facdomainIndeterminate > 0) || ((facdomainChecked < facdomain.children.length) && facdomainChecked > 0);
    });

    this.setState({
      layers,
      noneSelected,
    });
  };

  render() {
    const index = this.state.selectedIndex;

    const layers = this.state.layers;

    const layerTabs = layers.map((layer, i) => (
      <ListItem
        value={i}
        className={`list-item ${i === index ? 'selected' : null}`}
        style={{
          borderLeft: `4px solid ${layer.color}`,
        }}
        primaryText={layer.name}
        secondaryText={layer.description}
        leftIcon={
          <FontIcon
            className={`fa fa-${layer.icon}`}
            style={{
              color: layer.color,
              textAlign: 'center',
              textShadow: '1px 1px 2px rgba(150, 150, 150, 1)',
            }}
          />}
        rightIcon={
          <FontIcon className={'fa fa-chevron-right'} />
        }
        key={layer.name}
      />
    ));

    const layerContent = layers.map((layer, i) => (
      <div
        className={`content ${index !== i ? 'hidden' : ''}`}
        key={layer.name}
      >
        <NestedSelect
          layers={[layer]}
          onUpdate={this.handleSelectUpdate.bind(this, 0)}
          initiallyOpen
          abstractTopLevel
          key={layer.name}
        />
      </div>
    ));

    const selectedSubgroups = [];
    this.state.layers.forEach((domain) => {
      domain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          if (subgroup.checked) selectedSubgroups.push(subgroup.name);
        });
      });
    });

    return (
      <div className="splash-selector-container">
        <div className="splash-selector">
          <SelectableList
            onChange={this.handleIndexChange}
            selectedIndex={this.state.selectedIndex}
            style={{
              width: '50%',
              display: 'inline-block',
              padding: 0,
            }}
          >
            {layerTabs}
          </SelectableList>
          <div
            className="content-area"
            style={{ borderLeft: `4px solid ${this.state.layers[this.state.selectedIndex].color}` }}
          >
            {layerContent}
          </div>
        </div>

        <Link
          to={{
            pathname: '/map/facilities',
            state: {
              filterDimensions: getDefaultFilterDimensions({ values: this.state.layers }),
            },
          }}
          onClick={() => ga.event({
            category: 'facilities-entry',
            action: 'custom-selection',
            label: JSON.stringify(selectedSubgroups),
          })}
        >
          <div className={`btn btn-default ${this.state.noneSelected ? 'disabled' : null}`}>
            View selected features <i className="fa fa-arrow-right dcp-orange" aria-hidden="true" />
          </div>
        </Link>
      </div>
    );
  }
}

export default SplashSelector;
