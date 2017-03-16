import ReactGA from 'react-ga';
import appConfig from './appConfig';

ReactGA.initialize(appConfig.ga_tracking_code);

const ga = {
  event: (args) => {
    ReactGA.event(args);
  },
};

export default ga;
