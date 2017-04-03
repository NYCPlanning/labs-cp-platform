import EventsEmitter from 'events';

import dispatcher from '../dispatcher';

class PipelineStore extends EventsEmitter {
  constructor() {
    super();
    this.sql = 'something';
  }

  filterChanged() {
    return true;
  }

  createDetailView() {
    console.log('foo');
    // this.sql = 'some data';
    this.emit('change');
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
