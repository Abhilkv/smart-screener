import { FETCH_VERSION_SUCCESS } from '../actions/types';
import { APP_VERSION } from '../config/apiConfig';

const defaultState = {
  versionAllowed: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_VERSION_SUCCESS:
      return {
        ...defaultState,
        versionAllowed: Number(action.res[0].versionNo) > APP_VERSION ? false : true,
      };
    default:
      return state;
  }
}
