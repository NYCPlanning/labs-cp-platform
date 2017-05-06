import React from 'react';
import PropTypes from 'prop-types';
import FixedDataTable from 'fixed-data-table';

const { Cell } = FixedDataTable;

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
  }

  onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC,
      );
    }
  }

  render() {
    const { sortDir, children, ...props } = this.props; // eslint-disable-line
    let sortArrow;
    if (sortDir) {
      sortArrow = (sortDir === SortTypes.DESC) ?
        <span className="fa fa-arrow-down header-fa" /> :
        <span className="fa fa-arrow-up header-fa" />;
    } else {
      sortArrow = '';
    }

    return (
      <Cell {...props}>
        <a onClick={this.onSortChange}>
          {children}
          {sortArrow}
        </a>
      </Cell>
    );
  }
}

SortHeaderCell.propTypes = {
  sortDir: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
  columnKey: PropTypes.string,
};

SortHeaderCell.defaultProps = {
  sortDir: null,
  columnKey: null,
};

export default SortHeaderCell;
