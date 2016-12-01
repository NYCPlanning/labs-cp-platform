import React, {createElement, cloneElement} from 'react'
import { Tabs as MuiTabs } from 'material-ui/Tabs'
import TabTemplate from 'material-ui/Tabs/TabTemplate.js'

import IconButton from 'material-ui/IconButton'

function getStyles(props, context) {
  const {tabs} = context.muiTheme;

  return {
    tabItemContainer: {
      width: '100%',
      backgroundColor: tabs.backgroundColor,
      whiteSpace: 'nowrap',
      display: 'flex',
    },
  };
}


class Tabs extends MuiTabs {
  render() {

    var style = {
      container: {
        transform: this.props.open ? null : 'translate(-320px,0)'
      }
    }

    const tabTemplate = null
    const tabTemplateStyle = {}

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const valueLink = this.getValueLink(this.props);
    const tabValue = valueLink.value;
    const tabContent = [];
    const width = 100 / this.getTabCount();

    const tabs = this.getTabs().map((tab, index) => {

      console.log(tab.props.children)
      tabContent.push(tab.props.children ?
        createElement(tabTemplate || TabTemplate, {
          key: index,
          selected: this.getSelected(tab, index),
          style: tabTemplateStyle,
        }, tab.props.children) : undefined);

      return cloneElement(tab, {
        key: index,
        index: index,
        selected: this.getSelected(tab, index),
        width: `${width}%`,
        onTouchTap: this.handleTabTouchTap,
      });
    });

    console.log(tabs)
    console.log(tabContent)

    return (
      <div className="tabDrawer-container" style={style.container}>
        <div className="tabDrawer-content">
          {tabContent}
        </div>
        <div className="tabDrawer-bar">
       
          <div className="bottom">
            <IconButton  
              style={{ width: '40px', color: '#fff', padding: 'none' }} 
              iconStyle={{ color: '#fff' }} 
              iconClassName={this.props.open ? "fa fa-angle-double-left" : "fa fa-angle-double-right"} 
              onTouchTap={this.props.onToggleOpen}
            />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Tabs