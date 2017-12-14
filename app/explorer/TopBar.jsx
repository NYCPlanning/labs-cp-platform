import React from 'react';
import PropTypes from 'prop-types';

import Analysis from './Analysis';
import Results from './Results';
import Download from './Download';

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdown: null,
    };
  }

  selectDropdown = (dropdown) => {
    if (this.state.dropdown === dropdown) {
      this.setState({ dropdown: null });
    } else {
      this.setState({ dropdown });
    }
  }

  render() {
    return (
      <div className="top-bar" style={{ left: this.props.leftOffset }}>
        {this.props.children}

        <div className="dropdown-buttons" style={{ right: this.props.leftOffset }}>
          <button onClick={() => this.selectDropdown('results')}><span className={'fa fa-list'} />Results</button>
          <button onClick={() => this.selectDropdown('analysis')}><span className={'fa fa-bar-chart'} />Analysis</button>
          <button onClick={() => this.selectDropdown('download')}><span className={'fa fa-download'} />Download</button>
        </div>

        <div className="top-bar-dropdown" display={!!this.state.dropdown} style={{ right: this.props.leftOffset }}>
          { this.state.dropdown === 'results' && <Results /> }
          { this.state.dropdown === 'analysis' && <Analysis /> }
          { this.state.dropdown === 'download' && <Download layers={this.props.layers} /> }
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  leftOffset: PropTypes.number,
  children: PropTypes.object,
  layers: PropTypes.array.isRequired,
};

TopBar.defaultProps = {
  leftOffset: 0,
  children: null,
};

export default TopBar;
