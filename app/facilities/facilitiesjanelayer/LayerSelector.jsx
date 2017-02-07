// LayerSelector.jsx - This component builds the layer selector which is used in the facilities JaneLayer

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import Checkbox from './Checkbox';
import CountWidget from '../../common/CountWidget';
import InfoIcon from '../../common/InfoIcon';

import config from './config';
import facilitiesLayers from '../facilitiesLayers';
import Carto from '../../helpers/carto';

import './LayerSelector.scss';


const LayerSelector = React.createClass({
  propTypes: {
    mode: React.PropTypes.string.isRequired,
    updateSQL: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      layers: [],
      selectedCount: null,
      totalCount: null,
      checked: 'all', // all, none, or null
      filterDimensions: {
        operatortype: [],
        oversightabbrev: [],
        propertytype: [],
      },
    });
  },

  /* checks to see if there is only one domain.*/
  /* if it's a domain subset page (only one domain), expands all and then requests that count be updated*/
  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'uid, the_geom_webmercator, domain, facilitygroup, facilitysubgroup, facilityname, address, facilitytype',
      tablename: 'cpadmin.facilities',
    };

    let layerStructure = facilitiesLayers;

    // check everything
    layerStructure = facilitiesLayers.map((domain) => {
      domain.checked = true;
      domain.children = domain.children.map((group) => {
        group.checked = true;
        group.children = group.children.map((subgroup) => {
          subgroup.checked = true;
          return subgroup;
        });
        return group;
      });
      return domain;
    });


    // filter the base layerstructure if we are in a domain view
    if (this.props.mode !== 'all') {
      layerStructure = layerStructure.filter(layer => (layer.slug === this.props.mode));
    }

    this.setState({ layers: layerStructure }, () => {
      self.buildSQL(); // trigger map layer update
    });
  },

  componentDidMount() {
    // expand list if we are on a domain page
    if (this.state.layers.length === 1) {
      this.expandAll();
    }
  },

  getTotalCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => {
        self.setState({
          selectedCount: count,
          totalCount: count,
        });
      });
  },

  getSelectedCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => { self.setState({ selectedCount: count }); });
  },

  toggleCheckbox(type, domain, group, subgroup) {
    const layers = this.state.layers;

    // update state
    if (type === 'subgroup') {
      layers[domain].children[group].children[subgroup].checked = !layers[domain].children[group].children[subgroup].checked;

      this.buildSQL();
    } else if (type === 'group') {
      const thisGroup = layers[domain].children[group];
       // figure out if new state is checked or not checked

      thisGroup.checked = !thisGroup.checked;

      thisGroup.children = thisGroup.children.map((child) => {
        child.checked = thisGroup.checked;
        return child;
      });

      this.buildSQL();
    } else {
      const thisDomain = layers[domain];

      // toggle checked status
      thisDomain.checked = !thisDomain.checked;

      // toggle all children and grandChildren
      thisDomain.children = thisDomain.children.map((thisGroup) => {
        thisGroup.checked = thisDomain.checked;
        thisGroup.children = thisGroup.children.map((thisSubgroup) => {
          thisSubgroup.checked = thisDomain.checked;
          return thisSubgroup;
        });
        return thisGroup;
      });

      this.buildSQL();
    }
  },

  processChecked() {
    const layers = this.state.layers;

    let allChecked = 0;
    let allIndeterminate = 0;
    // set indeterminate states, start from the bottom and work up
    layers.forEach((domain) => {
      let domainChecked = 0;
      // first set all the groups
      domain.children.forEach((group) => {
        let groupChecked = 0;
        group.children.forEach((subgroup) => {
          if (subgroup.checked) groupChecked += 1;
        });

        group.checked = (groupChecked === group.children.length);
        group.indeterminate = !!((groupChecked < group.children.length && groupChecked > 0));

        if (group.checked) domainChecked += 1;
      });

      domain.checked = (domainChecked === domain.children.length);
      if (domain.checked) {
        allChecked += 1;
      }
      domain.indeterminate = !!((domainChecked < domain.children.length && domainChecked > 0));
      if (domain.indeterminate) {
        allIndeterminate += 1;
      }
    });

    let checkedStatus;
    // figure out whether all, none, or some are checked
    if (allChecked === layers.length) {
      checkedStatus = 'all';
    } else if (allChecked === 0 && allIndeterminate === 0) {
      checkedStatus = 'none';
    } else {
      checkedStatus = null;
    }

    this.setState({
      layers,
      checked: checkedStatus,
    });

    const selectedLayers = [];

    this.state.layers.forEach((domain) => {
      domain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          if (subgroup.checked) {
            selectedLayers.push(subgroup.name);
          }
        });
      });
    });

    return selectedLayers;
  },

  updateFilterDimension(key, values) {
    const abbreviated = values.map(value => ({
      value: value.value,
      label: value.value,
    }));

    this.state.filterDimensions[key] = key !== 'oversightabbrev' ? values : abbreviated;
    this.buildSQL();
  },

  createSQLChunks() {
    // create an array of where clause chunks to be joined by 'AND'
    this.sqlChunks = {};

    const f = this.state.filterDimensions;

    this.createMultiSelectSQLChunk('operatortype', f.operatortype);
    this.createMultiSelectSQLChunk('oversightabbrev', f.oversightabbrev);
    this.createMultiSelectSQLChunk('propertytype', f.propertytype);
    this.createCategorySQLChunk();
  },

  // builds WHERE clause partial for operatortype filter
  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')
    const subChunks = values.map((value) => {
      if (dimension !== 'oversightabbrev') {
        return `${dimension} = '${value.value}'`;
      }

      return `${dimension} LIKE '%${value.value}%'`;
    });

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const joined = subChunks.join(' OR ');
      const chunk = `(${joined})`;

      this.sqlChunks[dimension] = chunk;
    }
  },

  // builds the WHERE clause partial for facilitysubgroup filter
  createCategorySQLChunk() {
    const layers = this.processChecked();

    let layersChunk = '';

    layers.forEach((name, i) => {
      if (i > 0) layersChunk += ' OR ';
      layersChunk += `facilitysubgroup = '${name}'`;
    });

    this.sqlChunks.facilitysubgroup = (layersChunk.length > 0) ? `(${layersChunk})` : 'false';
  },

  buildSQL() {
    // the main event!  This method is called whenever any change is detected in the UI,
    // and ultimately ends up passing a new layerconfig to jane

    this.createSQLChunks();

    const chunksArray = [];

    Object.keys(this.sqlChunks).forEach((key) => {
      chunksArray.push(this.sqlChunks[key]);
    });

    const chunksString = chunksArray.length > 0 ? chunksArray.join(' AND ') : 'true';

    const sql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE ${chunksString}`;

    if (this.state.totalCount == null) this.getTotalCount(sql);

    this.props.updateSQL(sql);
    this.getSelectedCount(sql);
  },

  selectAll() {
    const layers = this.state.layers;

    layers.forEach((domain) => {
      domain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          (subgroup.checked) = true;
        });
      });
    });

    this.buildSQL();
  },

  selectNone() {
    const layers = this.state.layers;

    layers.forEach((domain) => {
      domain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          (subgroup.checked) = false;
        });
      });
    });

    this.buildSQL();
  },

  expandAll() {
    // geez, just do it with jQuery
    $('.caret-container.collapsed').click(); // eslint-disable-line no-undef
  },

  collapseAll() {
    $('.caret-container:not(.collapsed)').click(); // eslint-disable-line no-undef
  },

  render() {
    const self = this;

    // override material ui ListItem spacing and react-select component font size
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    return (
      <div>
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'facilities'}
        />

        <Subheader
          style={{
            paddingTop: '12px',
          }}
        >
          Oversight Agency
          <InfoIcon text="The agency that funds or oversees this facility" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <Select
            multi
            placeholder="Search and Select Oversight Agencies"
            value={this.state.filterDimensions.oversightabbrev}
            name="form-field-name"
            options={config.agencies}
            onChange={this.updateFilterDimension.bind(this, 'oversightabbrev')}
          />
        </ListItem>

        <Subheader>
          Operator Type
          <InfoIcon text="The type of entity operating the facility" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <Select
            multi
            placeholder="Search and Select Operator Types"
            value={this.state.filterDimensions.operatortype}
            name="form-field-name"
            options={config.operatorTypes}
            onChange={this.updateFilterDimension.bind(this, 'operatortype')}
          />
        </ListItem>

        <Subheader>
          Property Type
          <InfoIcon text="Indicates whether the City owns or directly leases the property" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <Select
            multi
            placeholder="Search and Select Property Types"
            value={this.state.filterDimensions.propertytype}
            name="form-field-name"
            options={config.propertyTypes}
            onChange={this.updateFilterDimension.bind(this, 'propertytype')}
          />
        </ListItem>

        <Subheader>
          Facility Category
          <a href="https://nycplanning.github.io/cpdocs/facdb/" target="_blank" rel="noreferrer noopener"><InfoIcon text="Learn more about facility types" /></a>
        </Subheader>
        <ListItem
          disabled
          style={listItemStyle}
        >
          <div className="btn-group btn-group-xs" role="group">
            <div className="btn dcp-orange btn-xs " onClick={this.selectAll} disabled={this.state.checked === 'all'}>Select All</div>
            <div className="btn dcp-orange btn-xs " onClick={this.selectNone} disabled={this.state.checked === 'none'}>Select None</div>
          </div>
          <br />
          <div className="btn-group btn-group-xs" role="group">
            <div
              className="btn dcp-orange btn-xs "
              onClick={this.expandAll}
            >Expand All</div>
            <div className="btn dcp-orange btn-xs " onClick={this.collapseAll}>Collapse All</div>
          </div>
        </ListItem>


        <ListItem
          disabled
        >
          <ul className="nav nav-pills nav-stacked" id="stacked-menu">
            {
                this.state.layers.map((domain, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={`domain${i}`}>
                    <Checkbox
                      value={domain.name}
                      checked={domain.checked}
                      indeterminate={domain.indeterminate}
                      onChange={self.toggleCheckbox.bind(self, 'domain', i, null, null)}
                    />
                    <div className="nav-container" style={{ backgroundColor: self.state.layers.length === 1 ? 'rgb(224, 224, 224)' : domain.color }}>
                      <div onClick={self.toggleCheckbox.bind(self, 'domain', i, null, null)}>{domain.name}</div>
                      <div className="caret-container collapsed" data-toggle="collapse" data-parent="#stacked-menu" href={`#p${i}`}><span className="caret arrow" /></div></div>
                    <ul className="group-container nav nav-pills nav-stacked collapse" id={`p${i}`} style={{ height: 'auto' }}>
                      {
                        domain.children.map((group, j) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <div className="group nav nav-pills nav-stacked collapse in" key={j}>
                            <Checkbox
                              value={group.name}
                              checked={group.checked}
                              indeterminate={group.indeterminate}
                              onChange={self.toggleCheckbox.bind(self, 'group', i, j, null)}
                            />
                            <li>
                              <div className="nav-sub-container" style={{ backgroundColor: self.state.layers.length === 1 ? group.color : domain.subColor }}>
                                <div onClick={self.toggleCheckbox.bind(self, 'group', i, j, null)} style={{ color: 'black' }}>
                                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">{group.description}</Tooltip>}>
                                    <a href="http://docs.capitalplanning.nyc/facdb/#overview" target="_blank" rel="noreferrer noopener"><i className="fa fa-info-circle" aria-hidden="true" />&#8291;</a>
                                  </OverlayTrigger>
                                  {group.name}
                                </div>
                                <div className="caret-container collapsed" data-toggle="collapse" data-parent={`#p${i}`} href={`#pv${i}${j}`} style={{ color: 'black' }}><span className="caret arrow" /></div>
                              </div>
                            </li>

                            <ul className="subgroup-container nav nav-pills nav-stacked collapse" id={`pv${i}${j}`} style={{ height: 'auto' }} >
                              {
                                  group.children.map((subgroup, k) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <li className="subgroup" key={k}>
                                      <Checkbox
                                        value={subgroup.name}
                                        checked={subgroup.checked}
                                        indeterminate={false}
                                        onChange={self.toggleCheckbox.bind(self, 'subgroup', i, j, k)}
                                      />
                                      <div onClick={self.toggleCheckbox.bind(self, 'subgroup', i, j, k)} style={{ color: 'black' }}>
                                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">{subgroup.description}</Tooltip>}>
                                          <a href="http://docs.capitalplanning.nyc/facdb/#overview" target="_blank" rel="noreferrer noopener"><i className="fa fa-info-circle" aria-hidden="true" />&#8291;</a>
                                        </OverlayTrigger>
                                        {subgroup.name}
                                      </div>
                                    </li>
                                    ))
                                }
                            </ul>
                          </div>
                          ))
                      }
                    </ul>
                  </li>
                  ))
              }
          </ul>
        </ListItem>
      </div>
    );
  },
});


module.exports = LayerSelector;
