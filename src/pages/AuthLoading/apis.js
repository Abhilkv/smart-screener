import * as types from '../../actions/types';
import googleSheetApiCall from '../../api/googleSheetApi';
import apiCall from '../../api/api';

export const getStockList = async () => {
  const key = `1D2sLsLJJ2XCSk7Jk7er-wEHavUTtqjWiiZW8y2GT7Ak`;
  const apiArgs = {
    key,
    TYPES: {
      successType: types.FETCH_STOCKS_SUCCESS,
    },
  };
  return await googleSheetApiCall(apiArgs);
}; 

export const arrangeStockList = async () => {
  const key = `1ZgTllEjBAz5JY1D1O4wr-SMmaRC6ympGlEtQVxOGwMo`;
  const apiArgs = {
    key,
    TYPES: {
      successType: types.ARRANGE_STOCKS_SUCCESS,
    },
  };
  return await googleSheetApiCall(apiArgs);
};

export const getAppVersion = async () => {
  const key = `1Z6jYvgZUrjk6rD0C355h1xcm1D4uy-UkA9aUFLCWy6g`;
  const apiArgs = {
    key,
    TYPES: {
      successType: types.FETCH_VERSION_SUCCESS,
    },
  };
  return await googleSheetApiCall(apiArgs);
};

export const signInUser = async () => {
  const url = `/auth/angelbroking/user/v1/loginByPassword`;
  const apiArgs = {
    API_CALL: {
      method: 'POST',
      data: {
        "clientcode": "",//clientcode
        "password": "" //password
      },
    },
    url,
    TYPES: {
      successType: types.USER_LOGIN_SUCCESS,
      failureType: types.USER_LOGIN_FAIL,
    },
  };
  return await apiCall(apiArgs);
};

export const getScrips = async () => {
  const url = ``;
  const apiArgs = {
    independent : true,
    API_CALL: {
      method: 'GET',
    },
    url,
    TYPES: {
      successType: null,
      failureType: null,
    },
  };
  return await apiCall(apiArgs);
};

