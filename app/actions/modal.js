import * as AT from '../constants/actionTypes';

export const openModal = modalOptions => ({
  type: AT.OPEN_MODAL,
  payload: { modalOptions },
});

export const closeModal = () => ({
  type: AT.CLOSE_MODAL,
});
