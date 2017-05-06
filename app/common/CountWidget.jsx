import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Numeral from 'numeral';

import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import './CountWidget.scss';

const CountWidget = createReactClass({
  propTypes: {
    totalCount: PropTypes.number,
    selectedCount: PropTypes.number,
    units: PropTypes.string.isRequired,
    resetFilter: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      totalCount: null,
      selectedCount: null,
    };
  },

  getInitialState() {
    return { resetSpin: false };
  },

  handleReset() {
    this.props.resetFilter();
    this.setState({ resetSpin: true }, () => {
      setTimeout(() => {
        this.setState({ resetSpin: false });
      }, 1000);
    });
  },

  render() {
    const totalCount = Numeral(this.props.totalCount).format('0,0');
    const selectedCount = Numeral(this.props.selectedCount).format('0,0');

    let countText = '';

    if (this.props.selectedCount === this.props.totalCount) {
      countText = (
        <span>Showing all <span className="bigNumber">{totalCount}</span> {this.props.units}</span>
      );
    } else {
      countText = (
        <span>
          <span className={`bigNumber ${selectedCount === '0' ? 'zero' : ''}`}>{selectedCount}</span> of <span className="bigNumber">{totalCount}</span> {this.props.units}
        </span>
      );
    }

    let rightIcon = (
      <FontIcon
        className={`fa fa-refresh ${this.state.resetSpin ? 'fa-spin' : ''}`}
        hoverColor="green"
        style={{ margin: '9px', cursor: 'pointer', width: '20px' }}
        onClick={this.handleReset}
      />
    );

    if (this.props.selectedCount === this.props.totalCount) rightIcon = null;


    return (
      <div className="countWidget">
        <ListItem
          style={{
            padding: '12px 12px 12px 55px',
            backgroundColor: '#efefef',
          }}
          leftIcon={
            <FontIcon
              className="fa fa-filter"
              style={{ margin: '9px' }}
            />
          }
          rightIcon={rightIcon}
          disabled
        >
          {countText}
        </ListItem>
      </div>
    );
  },
});

module.exports = CountWidget;
