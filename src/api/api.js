import axios from 'axios';

import * as types from '../actions/types';
import store from '../store/index';
import Storage from '../utilities/storage';

const BASE_URL = 'https://apiconnect.angelbroking.com/rest'
const KEY = 'fxM7pfTR'

const getHeaders = (token) => {
  return {
    'Authorization': token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': '192.168.168.168',
    'X-ClientPublicIP': '106.193.147.98',
    'X-MACAddress': 'fe80::216e:6507:4b90:3719',
    'X-PrivateKey': KEY,
  };
};

const callRefresh = async (token) => {
  const url = `/auth/angelbroking/jwt/v1/generateTokens`;
  const apiArgs = {
    API_CALL: {
      method: 'POST',
      data: {
        refreshToken: token,
      },
    },
    url,
    TYPES: {
      successType: types.REFRESH_TOKEN_SUCCESS,
      failureType: types.REFRESH_TOKEN_FAIL,
    },
  };
  return await apiCall(apiArgs);
};

const refreshSession = async (data) => {
  const refreshToken = await Storage.retrieveRefreshToken();
  if (refreshToken) {
    const response = await callRefresh(refreshToken);
    console.log({ response })
    if (response && response.data && response.data.status) {
      await Storage.storeUserToken(esponse.data.data.jwtToken);
      await Storage.storeRefreshToken(esponse.data.data.refreshToken);
    }
    return await apiCall(data);
  }
};

export default async function apiCall(payload) {
  const {
    API_CALL,
    TYPES,
    url,
    independent= false
  } = payload;
  const API_URL =independent? 'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json': `${BASE_URL}${url}`;
  const token = await Storage.retrieveUserToken();

  // Setting API parameters
  const apiParams = {
    ...API_CALL,
    url: API_URL,
    headers: getHeaders(token || ''),
  };
  try {
    const apiResponse = await axios(apiParams);
    if (apiResponse.status === 200) {
      if(independent){
        return apiResponse.data;
      }
      if (apiResponse.data.status === true) {
        await Storage.storeUserToken(apiResponse.data.data.jwtToken);
        await Storage.storeRefreshToken(apiResponse.data.data.refreshToken);
        store.dispatch({
          type: TYPES.successType,
          res: apiResponse.data,
        });
      }
      else {
        if (apiResponse.data.errorcode === 'AG8002') {
          const res = await refreshSession(payload);
          return res;
        }
      }
      return apiResponse.data;
    }
  } catch (error) {
    if (independent) return;
    store.dispatch({
      type: TYPES.failureType,
    });
  }
  return null;
}