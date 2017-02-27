// Component that generates line of shortcuts with certain filters to the Facilities Explorer
// Note: the shortcuts must be given the same objects (with value and label) as found in config.js

import React from 'react';
import { Link } from 'react-router';

import './SplashFilterShortcuts.scss';
import layersGenerator from './layersGenerator';

const SplashFilterShortcuts = () =>
  (
    <div className="splash-filter-shortcuts">
      <Link
        to={{
          pathname: '/facilities/explorer',
          state: {
            filterDimensions: {
              propertytype: [
                { value: 'City Owned', label: 'City Owned' },
                { value: 'City Leased', label: 'City Leased' },
              ],
            },
          },
        }}
      >
        <div className="btn btn-lg dcp-orange">City Owned and Leased Properties <i className="fa fa-arrow-right" aria-hidden="true" /></div>
      </Link>

      <Link
        to={{
          pathname: '/facilities/explorer',
          state: {
            layers: layersGenerator.partialChecked({
              'Health and Human Services': { 'Health Care': null },
              'Education, Child Welfare, and Youth': {
                'Schools (K-12)': { 'Public Schools': null },
                'Child Care and Pre-Kindergarten': null,
              },
              'Libraries and Cultural Programs': { Libraries: { 'Public Libraries': null } },
              'Public Safety, Emergency Services, and Administration of Justice': {
                'Emergency Services': { 'Fire Services': null },
                'Public Safety': { 'Police Services': null },
              },
            }),
          },
        }}
      >
        <div className="btn btn-lg dcp-orange">Community Facilities and Services as Defined for CEQR Analysis <i className="fa fa-arrow-right" aria-hidden="true" /></div>
      </Link>

      <Link
        to={{
          pathname: '/facilities/explorer',
          state: {
            layers: layersGenerator.partialChecked({
              'Health and Human Services': {
                'Human Services': { 'Senior Services': null, 'Programs for People with Disabilities': null },
              },
              'Education, Child Welfare, and Youth': {
                'Schools (K-12)': null,
                'Child Care and Pre-Kindergarten': null,
                'Child Welfare': null,
                'Youth Services': null,
                Camps: null,
              },
            }),
          },
        }}
      >
        <div className="btn btn-lg dcp-orange">Facilities Serving Children, Seniors, and People with Disabilities <i className="fa fa-arrow-right" aria-hidden="true" /></div>
      </Link>
    </div>
  );

export default SplashFilterShortcuts;
