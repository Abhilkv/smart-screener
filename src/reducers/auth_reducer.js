import { FETCH_STOCKS_SUCCESS, USER_LOGIN_SUCCESS, ARRANGE_STOCKS_SUCCESS, REFRESH_TOKEN_SUCCESS } from '../actions/types';

const defaultState = {
  stocks: [{}],
  allStocks: [{}],
  jwtToken: false,
  refreshToken: false,
  feedToken: false,
  clientCode:'R306253'
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.res,
      };    
    case ARRANGE_STOCKS_SUCCESS:
      return {
        ...state,
        allStocks: action.res,
      };
      
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        jwtToken: action.res.data.jwtToken,
        refreshToken: action.res.data.refreshToken,
        feedToken: action.res.data.feedToken,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        jwtToken: action.res.data.jwtToken,
        refreshToken: action.res.data.refreshToken,
        feedToken: action.res.data.feedToken,
      };
    default:
      return state;
  }
}
