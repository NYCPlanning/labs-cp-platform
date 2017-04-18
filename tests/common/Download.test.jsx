import renderer from 'react-test-renderer';
import React from 'react';
import Download from '../../app/common/Download';

// Boilerplate required by MUI at the moment :/
// https://github.com/callemall/material-ui/issues/686
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

test('Download.jsx does its thing', () => {
  Date.now = jest.fn(() => 1492014178000);

  const component = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Download
        sql="SELECT * FROM that_table"
        filePrefix="good_stuff"
      />
    </MuiThemeProvider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
