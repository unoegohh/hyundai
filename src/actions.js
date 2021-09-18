import axios from 'axios';

export const SAVE_EVENTS = 'save_events';
export const SET_LOADING = 'set_laoding';

export const SaveEventsAction = items => {
  return {
    type: SAVE_EVENTS,
    payload: {items},
  };
};
export const SetLoadingAction = loading => {
  return {
    type: SET_LOADING,
    payload: {loading},
  };
};

export const GetEventsAction = () => {
  return dispatch => {
    dispatch(SetLoadingAction(true));
    axios
      .get('https://api.github.com/events', {
        params: {
          per_page: 25,
        },
      })
      .then(resp => {
        dispatch(SaveEventsAction(resp.data));
      })
      .catch(e => {
        console.log('error', e);
        //todo
      })
      .finally(() => {
        dispatch(SetLoadingAction(false));
      });
  };
};
