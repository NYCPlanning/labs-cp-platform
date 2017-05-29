import React from 'react';
import { JaneLayer } from 'jane-maps';

import TransportationComponent from './transportation/Component';
import AdminBoundariesComponent from './adminboundaries/Component';
import TravelshedComponent from './travelshed/Component';
import AerialsComponent from './aerials/Component';

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

  adminboundaries: (
    <JaneLayer
      id="adminboundaries"
      name="Admin. Boundaries"
      icon="flag"
      component={<AdminBoundariesComponent />}
    />
  ),

  travelshed: (
    <JaneLayer
      id="travelshed"
      name="Travelshed"
      icon="road"
    >
      <TravelshedComponent />
    </JaneLayer>
  ),
};


export default janeLayerConfig;
