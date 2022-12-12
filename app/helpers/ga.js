import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
import appConfig from '../config/appConfig';

ReactGA.initialize(appConfig.ga_tracking_code);
ReactGA4.initialize(appConfig.ga4_tracking_code);

const ga = {
  event: (args) => {
    ReactGA.event(args);
    ReactGA4.event(args);
  },
};

export default ga;
