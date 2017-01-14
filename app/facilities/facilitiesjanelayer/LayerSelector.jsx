// /facilities/FacLayerSelector.jsx - This component builds the layer selector which is used in the explorer
// Props:
//  layerStructure - A json containing the heirachy of domains, groups, and subgroups, and descriptions and colors
//  initialSQL - String containing the initial SQL state set in FacExplorer.jsx
//  updateSQL - String containing updates to SQL query based on checked layers

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Checkbox from './Checkbox';
import CountWidget from '../../common/CountWidget';

import facilitiesLayers from '../facilitiesLayers';
import Carto from '../../helpers/carto';

import '../../../stylesheets/facilities/FacLayerSelector.scss';

const LayerSelector = React.createClass({
  propTypes: {
    mode: React.PropTypes.string,
    updateSQL: React.PropTypes.func,
  },

  getInitialState() {
    return ({
      layers: [],
      selectedCount: null,
      totalCount: null,
      checked: 'all', // all, none, or null
    });
  },

  /* checks to see if there is only one domain.*/
  /* if it's a domain subset page (only one domain), expands all and then requests that count be updated*/
  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, domain, facilitygroup, facilitysubgroup, facilityname, address, facilitytype',
      tablename: 'hkates.facilities_data',
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

  buildSQL() {
    // the main event!  This method is called whenever any change is detected in the UI,
    // and ultimately ends up passing a new layerconfig to jane

    let sql;

    const layers = this.processChecked();

    if (layers.length > 0) {
      sql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE `;

      layers.forEach((name, i) => {
        if (i > 0) sql += ' OR ';
        sql += `facilitysubgroup = '${name}'`;
      });
    } else {
      sql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} LIMIT 0`;
    }


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

    return (
      <div>
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'facilities'}
        />
        <Subheader>
            Select facility types to display on the map.
            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip"> Learn more about facility types</Tooltip>}>
              <a href="https://nycplanning.github.io/cpdocs/facdb/"> <i className="fa fa-info-circle" aria-hidden="true" /></a>
            </OverlayTrigger>
        </Subheader>
        <ListItem
          disabled
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
                                    <a href="http://docs.capitalplanning.nyc/facdb/#overview"><i className="fa fa-info-circle" aria-hidden="true" />&#8291;</a>
                                  </OverlayTrigger>
                                  {group.name}
                                </div>
                                <div className="caret-container collapsed" data-toggle="collapse" data-parent={`#p${i}`} href={`#pv${i}${j}`} style={{ color: 'black' }}><span className="caret arrow" /></div>
                              </div>
                            </li>

                            <ul className="subgroup-container nav nav-pills nav-stacked collapse" id={`pv${i}${j}`} style={{ height: 'auto' }} >
                              {
                                  group.children.map((subgroup, k) => (
                                    <li className="subgroup" key={k}>
                                      <Checkbox
                                        value={subgroup.name}
                                        checked={subgroup.checked}
                                        indeterminate={false}
                                        onChange={self.toggleCheckbox.bind(self, 'subgroup', i, j, k)}
                                      />
                                      <div onClick={self.toggleCheckbox.bind(self, 'subgroup', i, j, k)} style={{ color: 'black' }}>
                                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">{subgroup.description}</Tooltip>}>
                                          <a href="http://docs.capitalplanning.nyc/facdb/#overview"><i className="fa fa-info-circle" aria-hidden="true" />&#8291;</a>
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
