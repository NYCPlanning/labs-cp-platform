import * as AT from '../constants/actionTypes';

const initialState = {
  showAdvisoryModal: true,
};

const advisoryModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.HIDE_MODAL:
      return Object.assign({}, state, {
        showAdvisoryModal: false,
      });
    case AT.SHOW_MODAL:
      return Object.assign({}, state, {
        showAdvisoryModal: true,
      });

    default:
      return state;
  }
};

export default advisoryModalReducer;
