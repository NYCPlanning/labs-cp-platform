import React from 'react';
import { JaneLayer } from 'jane-maps';

import TransportationComponent from './transportation/Component';
import AdminBoundariesComponent from './adminboundaries/Component';
import AerialsComponent from './aerials/Component';
import ZoningComponent from './zoning/Component';

const janeLayerConfig = {
  transportation: (
    <JaneLayer
      id="transportation"
      name="Transportation"
      icon="subway"
      component={<TransportationComponent />}
    />
  ),

  aerials: (
    <JaneLayer
      id="aerials"
      name="Aerial Imagery"
      icon="camera"
      component={<AerialsComponent />}
    />
  ),

  zoning: (
    <JaneLayer
      id="zoning"
      name="Zoning"
      icon="building"
      component={<ZoningComponent />}
    />
  ),

  adminboundaries: (
    <JaneLayer
      id="adminboundaries"
      name="Admin. Boundaries"
      icon="flag"
      component={<AdminBoundariesComponent />}
    />
  ),
};


export default janeLayerConfig;
