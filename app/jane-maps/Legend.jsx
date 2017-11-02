import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Legend.scss';

class Legend extends React.Component {
  static contextTypes = {
    addLegend: PropTypes.func,
    removeLegend: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    this.legend = this.props.children;

    this.context.addLegend(this.legend);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.children, nextProps.children)) {
      this.context.removeLegend(this.props.children);
      this.context.addLegend(nextProps.children);
    }
  }

  componentWillUnmount() {
    this.context.removeLegend(this.legend);
  }

  render() {
    return null;
  }
}

export default Legend;
