// Component that generates line of shortcuts with certain filters to the Facilities Explorer
// Note: the shortcuts must be given the same objects (with value and label) as found in config.js

import React from 'react';
import { Link } from 'react-router';

import './SplashFilterShortcuts.scss';

const SplashFilterShortcuts = () =>
  (
    <div className="splash-filter-shortcuts">
      <Link
        to={{
          pathname: '/facilities/explorer',
          state: {
            filterDimensions: {
              operatortype: [
                {
                  label: 'Public',
                  value: 'Public',
                },
              ],
            },
          },
        }}
      >
        <div className="btn btn-lg dcp-orange">View Only Public Facilities <i className="fa fa-arrow-right" aria-hidden="true" /></div>
      </Link>

      <Link
        to={{
          pathname: '/facilities/explorer',
          state: {
            filterDimensions: {
              propertytype: [
                {
                  value: 'City Owned',
                  label: 'City Owned',
                },
                {
                  value: 'City Leased',
                  label: 'City Leased',
                },
              ],
            },
          },
        }}
      >
        <div className="btn btn-lg dcp-orange">View Only City Managed Facilities <i className="fa fa-arrow-right" aria-hidden="true" /></div>
      </Link>

      <Link
        to={{
          pathname: '/facilities/explorer',
          state: {
            filterDimensions: {
              propertytype: [
                {
                  value: '',
                  label: 'Not Owned or Leased by City',
                },
              ],
            },
          },
        }}
      >
        <div className="btn btn-lg dcp-orange">View Non-City Managed Facilities <i className="fa fa-arrow-right" aria-hidden="true" /></div>
      </Link>
    </div>
  );

export default SplashFilterShortcuts;
