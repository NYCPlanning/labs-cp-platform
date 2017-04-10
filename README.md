# The Capital Planning Platform

A Single Page Application(SPA) for the various front-end map and data tools produced by the NYC DCP Capital Planning Team

## Architecture
As an SPA, all of the business logic and routing are done client-side.  The app is comprised of various React.js Components and makes use of React-Router for client-side routing. The React JSX files are built with webpack to create a single `bundle.js` file.

The app makes heavy use of various web mapping technologies, including raster maps and interactivity served from a carto server, and client-side map rendering in leaflet.js and mapboxGL.js.

At the time of writing, the app is "backendless", and is using an in-house carto server as both its datastore and tiler.  The carto SQL api allows us to pass in SQL statements using AJAX and getting back JSON or geoJSON results for use in the app.  The carto maps api allows for the on-demand creation of custom vector and raster tiles, which can be displayed in the app using carto.js (leaflet) or mapboxGL.js

We are not storing carto api keys in the client-side code, so all interactions with the carto server are read-only. 

### Express app
In order to have pretty URLs, there is a minimal express.js application that serves the app when it is hosted on a server

### React-Router
React router handles

### Leaflet (cartodb.js)

### MapboxGL

### Auth0



## Main Products

Our initial products are map-based data explorers for Capital Planning's 3 new data products

### Capital Projects
A consolidated web map of NYC capital projects using agency-sourced data.  Users can filter by sponsor/managing agency, data, source, etc, and can click individual project geometries to get full details on a project

### Faciities
Facilities DB is a new dataset of government-related facilities.  The map application includes various filters by domain, group, and subgroup, and also has set pages for some specific queries of the data.

### Housing Pipeline
Shows locations of new housing units compiled primarily from DOB permit records and certificates of occupancy.


###Development Environment

We use `webpack-dev-server` to serve the app locally, which takes care of building the bundle and hot-reloading the browser when changes are saved to the code.

To get serve the project locally:

 - Clone this repository 
 `git clone https://github.com/NYCPlanning/capital-planning-platform.git`

 - Navigate to the directory
 `cd capital-planning-platform`

 -Install dependencies
 `npm install`

 -Serve the application
 `npm run devserve`
 This command uses webpack dev server to build the bundle and serve the app.

 -Load the app
 You should be able to access the app at `http://localhost:8080`



### Development Workflow

#### Letsencrypt
Traffic to the various Dokku apps is encrypted with SSL, using the dokku letsencrypt plugin.  When a certificate expires, a simple command `dokku letsencrypt:auto-renew` can be run on the server to automatically renew old certificates.

### Deploying
By using dokku, the app can be deployed simply by pushing the repo to a different remote:

To set up the production app:
`git remote add dokku dokku@capitalplanning.nyc:cpp`

To set up the staging app:
`git remote add staging dokku@capitalplanning.nyc:staging`

To deploy to production:
`git push dokku master`

To deploy to staging:
`git push staging staging:master` (This is because dokku only works with a branch called master, so we are calling staging master when pushing to the staging dokku app)

Update readme
