#Google Analytics

The explorer uses google analytics to track page loads and custom events.  This document is a place to log new custom events for consistent naming.

## GA helper
`app/helpers/ga.js` is a helper class that sets up the `React-GA` package with our tracking code.  It has a single method, `event()`, that passes the `args` object along to `React-GA`.  

Common usage would be in a react-router `<Link/>`'s `onClick` event:

```
import ga from '../helpers/ga';
<Link
  to={{ pathname: '/facilities/explorer' }}
  onClick={() => ga.event({
    category: 'facilities-entry',
    action: 'frequently-used',
    label: 'Community Facilities for CEQR',
  })}
>
```

## Events Schema

### Category: `facilities-entry`

Actions:
- `go-to-map` - clicked on the go to map button
- `neighborhood` - chose a neighborhood from the neighborhood selector (label: the neighborhood they chose)
- `frequently-used` - chose one of the frequently-used map buttons (label: the button they chose)
- `custom-selection` - entered via the splashSelector (label: JSON array of the selected subgroups)

### Category: `facilities-explorer`

Actions:
- `set-filter` - changed the filters
- `download` - downloaded data
