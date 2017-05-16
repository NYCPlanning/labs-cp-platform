// BigMoneyInput.jsx - UI component allowing the user to input a large number,
// used for range filtering

import React from 'react';
import createReactClass from 'create-react-class';
import { Dropdown, MenuItem } from 'react-bootstrap';

function getBase(number) {
  const abs = Math.abs(number);
  if (abs < 1000) {
    return number;
  }
  if (abs < 1000000) {
    return number / 1000;
  }
  if (abs < 1000000000) {
    return number / 1000000;
  }
  return number / 1000000000;
}

function getAbbrev(number) {
  const abs = Math.abs(number);
  if (abs < 1000) {
    return '--';
  }
  if (abs < 1000000) {
    return 'K';
  }
  if (abs < 1000000000) {
    return 'M';
  }
  return 'B';
}

function getMultiplier(multiplierSymbol) {
  if (multiplierSymbol === '--') return 1;
  if (multiplierSymbol === 'K') return 1000;
  if (multiplierSymbol === 'M') return 1000000;
  return 1000000000;
}

const BigMoneyInput = createReactClass({
  componentWillMount() {
    const { value } = this.props;
    this.setState({ multiplier: getMultiplier(getAbbrev(value)) });
  },

  componentWillReceiveProps(nextProps) {
    this.baseEl.value = getBase(nextProps.value);
  },

  handleSubmit(e) {
    if (e) e.preventDefault();

    const { onSubmit } = this.props;
    const { multiplier } = this.state;

    // gather base and multiplier, pass new value to onSubmit()
    const newValue = parseFloat(this.baseEl.value) * parseInt(multiplier);

    onSubmit(newValue);
  },

  handleSelect(multiplierSymbol) {
    const multiplier = getMultiplier(multiplierSymbol);
    // set multiplier in component state, trigger submit
    this.setState({ multiplier }, () => { this.handleSubmit(); });
  },

  render() {
    const { value, alignRight } = this.props;

    const style = alignRight ? { float: 'right' } : {};
    const dropdownStyle = {
      left: 'initial',
      right: 0,
      zIndex: 3,
    };

    return (
      <form className="manual-range-input" onSubmit={this.handleSubmit} style={style}>
        <div className="input-group">
          <span className="input-group-addon">
            $
          </span>
          <input
            type="number"
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            defaultValue={getBase(value)}
            ref={(baseEl) => { this.baseEl = baseEl; }}
            step={0.01}
          />
          <div className="input-group-btn">
            <Dropdown
              id="dropdown-custom-1"
              onSelect={this.handleSelect}
            >
              <Dropdown.Toggle>
                {getAbbrev(value)}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={alignRight ? dropdownStyle : {}}
              >
                <MenuItem eventKey="--">--</MenuItem>
                <MenuItem eventKey="K">thousand</MenuItem>
                <MenuItem eventKey="M">million</MenuItem>
                <MenuItem eventKey="B">billion</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </form>
    );
  },
});

export default BigMoneyInput;
