import {combineReducers} from 'redux';
import {SAVE_EVENTS, SET_LOADING} from './actions';

const INITIAL_STATE = {
  items: [],
  itemsLoading: false,
  updateDate: null,
};

const appReduser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return JSON.parse(
        JSON.stringify({...state, itemsLoading: action.payload.loading}),
      );
    case SAVE_EVENTS:
      state.updateDate = new Date().getTime();
      return JSON.parse(
        JSON.stringify({...state, items: action.payload.items}),
      );
    default:
      return state;
  }
};

export default combineReducers({
  app: appReduser,
});
