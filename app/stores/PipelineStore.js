import EventsEmitter from 'events';
import dispatcher from '../dispatcher';
import devTables from '../helpers/devTables';
import carto from '../helpers/carto';

class PipelineStore extends EventsEmitter {
  constructor() {
    super();
    this.sql = 'something';
  }

  filterChanged() {
    return true;
  }

  // maybe props from DetailPage just become an object here?

  createDetailView() {
    this.sql = carto.getFeature(devTables('pipeline_projects'), 'cartodb_id', parseInt(this.props.params.id));
    this.emit('change');
    console.log(this.sql);
  }

  handleActions(action) {
    switch (action.type) {
      case 'FILTER_CHANGED': {
        this.filterChanged();
        this.emit('change');
      }
    }

    // handle appropriate actions
  }
}

const pipelineStore = new PipelineStore();
window.pipelineStore = pipelineStore;

dispatcher.register(pipelineStore.handleActions.bind(pipelineStore));

export default pipelineStore;
