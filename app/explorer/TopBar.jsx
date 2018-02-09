import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Download from './Download';
import DataCaveats from '../explorer/DataCaveats';

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
    // const isAnalysis = this.state.dropdown === 'analysis';
    const isDownload = this.state.dropdown === 'download';

    return (
      <div className="top-bar" style={{ left: this.props.leftOffset }}>
        {this.props.children}

        <div className="dropdown-buttons" style={{ right: this.props.leftOffset }}>
          <DataCaveats
            layers={this.props.layers}
          />

          <button onClick={() => this.selectDropdown('download')} className={cx({ active: isDownload })}>
            <span className={'fa fa-download'} />Download
          </button>
        </div>

        <div className="top-bar-dropdown" display={!!this.state.dropdown} style={{ right: this.props.leftOffset }}>        
          { isDownload && <Download layers={this.props.layers} /> }
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
