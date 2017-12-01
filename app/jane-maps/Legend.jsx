import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Legend.scss';

class Legend extends React.Component {

  static displayName = 'Legend';

  static contextTypes = {
    addLegend: PropTypes.func,
    removeLegend: PropTypes.func,
    updateLegend: PropTypes.func,
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    this.context.addLegend(React.cloneElement(this.props.children, {
      id: this.props.id,
      key: this.props.id,
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.children, nextProps.children)) {
      this.context.updateLegend(this.props.id, React.cloneElement(nextProps.children, {
        id: this.props.id,
        key: this.props.id,
      }));
    }
  }

  componentWillUnmount() {
    this.context.removeLegend(this.props.id);
  }

  render() {
    return null;
  }
}

export default Legend;
