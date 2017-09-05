import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import convert from 'convert-units';

import './RadiusFilter.scss';

require('../helpers/MathRound10');

class RadiusFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      unit: 'mi',
      value: 1,
    };
  }

  handleUnitChange = (unit) => {
    this.setState({
      unit,
      value: Math.round10(convert(this.state.value).from(this.state.unit).to(unit), -2),
    });
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  }

  triggerRadiusFilter() {
    this.props.updateFilterDimension({
      coordinates: this.props.selectedPointCoordinates,
      radius: convert(this.state.value).from(this.state.unit).to('m'),
    });
  }

  resetRadiusFilter() {
    this.props.updateFilterDimension({
      coordinates: [],
      radius: 0,
    });
  }

  isFiltered() {
    return !!this.props.filterDimensions.radiusfilter.values.coordinates.length;
  }

  render() {
    return (
      // NEXT: capture point when click a location on the map
      <form>
        <FormGroup>
          <InputGroup style={{ width: 'calc(100% - 24px)' }}>
            <FormControl
              type="number"
              value={this.state.value}
              onChange={this.handleValueChange}
              step={1}
            />
            <DropdownButton
              componentClass={InputGroup.Button}
              title={this.state.unit}
              id="dropdown-radius-units"
              pullRight
              onSelect={this.handleUnitChange}
              style={{ minWidth: '50px' }}
            >
              <MenuItem eventKey="m">m</MenuItem>
              <MenuItem eventKey="km">km</MenuItem>
              <MenuItem eventKey="ft">ft</MenuItem>
              <MenuItem eventKey="mi">mi</MenuItem>
            </DropdownButton>
          </InputGroup>

          <ButtonGroup style={{ marginTop: '5px' }}>
            <Button
              style={{ width: '65px' }}
              disabled={!this.isFiltered()}
              bsStyle="warning"
              onClick={this.resetRadiusFilter.bind(this)}
            >
              Reset
            </Button>
            <Button
              style={{ width: '200px' }}
              disabled={!this.props.selectedPointCoordinates.length}
              onClick={this.triggerRadiusFilter.bind(this)}
            >
              Filter around Point<span className={this.props.selectedPointType} />
            </Button>
          </ButtonGroup>
        </FormGroup>
      </form>
    );
  }
}

RadiusFilter.propTypes = {
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array.isRequired,
  updateFilterDimension: PropTypes.func.isRequired,
  filterDimensions: PropTypes.object.isRequired,
};

export default RadiusFilter;
