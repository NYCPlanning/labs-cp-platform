import * as actions from '../../app/actions/modal';
import modalReducer from '../../app/reducers/modal';

describe('reducers/modalReducer', () => {
  test('OPEN_MODAL', () =>
    expect(modalReducer(false, actions.openModal({
      modalHeading: 'Modal Heading',
      modalContent: 'Modal Content',
      modalCloseText: 'Close Text',
    }))).toMatchSnapshot());

  test('OPEN_MODAL - reopen existing modal', () => {
    const initialState = {
      modalHeading: 'Modal Heading',
      modalContent: 'Modal Content',
      modalCloseText: 'Close Text',
    };

    expect(modalReducer(initialState, actions.openModal({
      modalHeading: 'New Modal Heading',
      modalContent: 'New Modal Content',
      modalCloseText: 'New Close Text',
    }))).toMatchSnapshot();
  });

  test('CLOSE_MODAL', () => {
    expect(modalReducer(false, actions.closeModal())).toMatchSnapshot();
    expect(modalReducer(true, actions.closeModal())).toMatchSnapshot();
  });
});
