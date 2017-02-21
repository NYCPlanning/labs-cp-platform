import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import NestedSelect from './janelayer/NestedSelect';
import layerConfig from './layerConfig';

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


const SplashSelector = React.createClass({ // eslint-disable-line react/no-multi-comp

  getInitialState: () => ({
    selectedIndex: 0,
    noneSelected: true,
  }),

  componentWillMount() {
    const layers = layerConfig;

    // set checked to false on everything
    layers.forEach((domain) => {
      domain.checked = false;
      domain.children.forEach((group) => {
        group.checked = false;
        group.children.forEach((subgroup) => {
          subgroup.checked = false;
        });
      });
    });

    this.setState({ layers });
  },

  handleIndexChange(index) {
    this.setState({
      selectedIndex: index,
    });
  },

  handleSelectUpdate() {
    this.processChecked();
  },

  // set indeterminate states, check/uncheck children, etc
  processChecked() {
    const layers = this.state.layers;
    let noneSelected = true;

    // set indeterminate states, start from the bottom and work up
    layers.forEach((domain) => {
      let domainChecked = 0;
      let domainIndeterminate = 0;

      domain.children.forEach((group) => {
        let groupChecked = 0;

        group.children.forEach((subgroup) => {
          if (subgroup.checked) {
            groupChecked += 1;
            noneSelected = false;
          }
        });

        group.checked = (groupChecked === group.children.length);
        group.indeterminate = !!((groupChecked < group.children.length) && groupChecked > 0);

        if (group.checked) domainChecked += 1;
        if (group.indeterminate) domainIndeterminate += 1;
      });

      domain.checked = (domainChecked === domain.children.length);
      domain.indeterminate = (domainIndeterminate > 0) || ((domainChecked < domain.children.length) && domainChecked > 0);
    });

    this.setState({
      layers,
      noneSelected,
    });
  },

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

    return (
      <div>
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
          <div className="content-area">
            {layerContent}
          </div>
        </div>
        <Link
          to={{
            pathname: '/facilities/explorer',
            state: {
              layers: this.state.layers,
            },
          }}
        >
          <div
            className={`btn btn-lg dcp-orange ${this.state.noneSelected ? 'disabled' : null}`}
          >
            View SELECTED Facilities <i className="fa fa-arrow-right" aria-hidden="true" />
          </div>
        </Link>
      </div>
    );
  },
});

export default SplashSelector;
