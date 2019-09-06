import {
  EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_CANCEL,
  HANDLE_EDIT_SERVICE,
  EDIT_CHANGE_SERVICE_FIELD
} from '../actions/actionTypes'

const initialState = {
  item: { name: '', price: '', id: ''},
  loading: false,
  error: null,
  editing: false
};

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_EDIT_SERVICE:
        const {editingItem} = action.payload;
        return {
          ...state,
          item: editingItem,
          editing: true
        };
    case EDIT_SERVICE_CANCEL:
      return {...initialState};
    case EDIT_SERVICE_SUCCESS:
      return {...initialState};
    case EDIT_CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const {item} = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        }
      };
    default:
      return state;
  }
}
