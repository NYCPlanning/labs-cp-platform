import React, { Component, PropTypes } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

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

  getInitialState: () => ({ selectedIndex: 3 }),

  handleIndexChange(index) {
    this.setState({
      selectedIndex: index,
    });
  },

  render() {
    const index = this.state.selectedIndex;

    return (
      <div className="splash-selector">
        <SelectableList
          onChange={this.handleIndexChange}
          selectedIndex={this.state.selectedIndex}
          style={{
            width: '50%',
            display: 'inline-block',
          }}
        >
          <ListItem
            value={1}
            primaryText="Health and Human Services"
            leftIcon={<FontIcon className="fa fa-heart" />}
          />
          <ListItem
            value={2}
            primaryText="Education, Child Welfare, and Youth"
            leftIcon={<FontIcon className="fa fa-graduation-cap" />}
          />
          <ListItem
            value={3}
            primaryText="Parks, Cultural, and Other Community Facilities"
            leftIcon={<FontIcon className="fa fa-pagelines" />}
          />
          <ListItem
            value={4}
            primaryText="Public Safety, Emergency Services, and Administration of Justice"
            leftIcon={<FontIcon className="fa fa-ambulance" />}
          />
          <ListItem
            value={5}
            primaryText="Core Infrastructure and Transportation"
            leftIcon={<FontIcon className="fa fa-bus" />}
          />
          <ListItem
            value={6}
            primaryText="Administration of Government"
            leftIcon={<FontIcon className="fa fa-bar-chart" />}
          />
        </SelectableList>
        <div className="content-area">
          <div
            className={`content ${index !== 1 ? 'hidden' : ''}`}
          >
            Content 1
          </div>
          <div
            className={`content ${index !== 2 ? 'hidden' : ''}`}
          >
            Content 2
          </div>
        </div>
      </div>
    );
  },
});

export default SplashSelector;
