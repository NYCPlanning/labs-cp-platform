import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Popup } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';

class PlanningJaneLayer extends React.Component {
  render() {
    return (
      <JaneLayer
        id="planning"
        name="Study Area"
        icon=""
    )
  }
}