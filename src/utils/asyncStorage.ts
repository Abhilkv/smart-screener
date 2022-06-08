import AsyncStorage from '@react-native-community/async-storage';

/*
 * Util to read and set access token to async storage
 */
export default (function () {
  let idToken: string | null;
  let accessToken: string | null;
  let refreshToken: string | null;
  return {
    /*
     * get id token from async storage
     */
    async getIDToken() {
      if (!idToken) {
        idToken = await AsyncStorage.getItem('idToken');
      }
      return idToken;
    },
    /*
     * get access token from async storage
     */
    async getAccessToken() {
      if (!accessToken) {
        accessToken = await AsyncStorage.getItem('accessToken');
      }
      return accessToken;
    },
    /*
     * get refresh token from async storage
     */
    async getRefreshToken() {
      if (!refreshToken) {
        refreshToken = await AsyncStorage.getItem('refreshToken');
      }
      return refreshToken;
    },
    /*
     * set access token, refresh token to async storage
     * @param { string } idToken
     * @param { string } refreshToken
     * @param { boolean } isOnBoarded
     */
    async set({
      idToken: idTokenStr,
      refreshToken: refreshTokenStr,
      accessToken: accessTokenStr,
    }: {
      idToken: string;
      refreshToken: string;
      accessToken: string;
    }) {
      try {
        idToken = idTokenStr;
        refreshToken = refreshTokenStr;
        accessToken = accessTokenStr;
        const response = await AsyncStorage.multiSet([
          ['idToken', idToken],
          ['refreshToken', refreshToken],
          ['accessToken', accessToken],
        ]);
        return response === null;
      } catch (err) {
        return err;
      }
    },
    /*
     * clear all values
     */
    async clear() {
      try {
        idToken = null;
        refreshToken = null;
        const response = await AsyncStorage.multiRemove([
          'idToken',
          'refreshToken',
        ]);
        return response === null;
      } catch (err) {
        return err;
      }
    },
    async clearAppData() {
      try {
        // clears all global variables mentioned in file
        idToken = null;
        refreshToken = null;
        accessToken = null;
        // clears storage
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
      } catch (err) {
        return err;
      }
    },
  };
})();
