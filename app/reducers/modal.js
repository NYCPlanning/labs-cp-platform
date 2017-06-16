import * as AT from '../constants/actionTypes';

const initialState = null;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.OPEN_MODAL:
      return action.payload.modalOptions;

    case AT.CLOSE_MODAL:
      return initialState;

    default:
      return state;
  }
};

export default modalReducer;
