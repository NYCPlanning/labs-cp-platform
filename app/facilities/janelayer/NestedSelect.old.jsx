import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Checkbox from './Checkbox';

const NestedSelect = React.createClass({

  toggleCheckbox(type, domain, group, subgroup) {
    const layers = this.props.layers;

    // update state
    if (type === 'subgroup') {
      layers[domain].children[group].children[subgroup].checked = !layers[domain].children[group].children[subgroup].checked;

      this.props.onUpdate(layers);
    } else if (type === 'group') {
      const thisGroup = layers[domain].children[group];
       // figure out if new state is checked or not checked

      thisGroup.checked = !thisGroup.checked;

      thisGroup.children = thisGroup.children.map((child) => {
        child.checked = thisGroup.checked;
        return child;
      });

      this.props.onUpdate(layers);
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

      this.props.onUpdate(layers);
    }
  },

  render() {
    const self = this;
    const layers = this.props.layers;

    return (
      <ul className="nav nav-pills nav-stacked" id="stacked-menu">
        {
          layers.map((domain, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`domain${i}`}>
              <Checkbox
                value={domain.name}
                checked={domain.checked}
                indeterminate={domain.indeterminate}
                onChange={self.toggleCheckbox.bind(self, 'domain', i, null, null)}
              />
              <div className="nav-container" style={{ backgroundColor: layers.length === 1 ? 'rgb(224, 224, 224)' : domain.color }}>
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
                        <div className="nav-sub-container" style={{ backgroundColor: layers.length === 1 ? group.color : domain.subColor }}>
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
    );
  },
});

export default NestedSelect;
