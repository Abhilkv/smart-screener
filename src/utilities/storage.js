import AsyncStorage from '@react-native-community/async-storage';
export default class Storage {

  static storeUserToken= async (token) => {
    try {
      await AsyncStorage.setItem('userToken', `Bearer ${token}`);
      // console.log("user token stored succesfully")
      return true;
    } catch (error) {
      // Error saving data
      // console.log("error in storing user token ")
      return false;
    }
  };

  static storeRefreshToken = async (token) => {
    try {
      await AsyncStorage.setItem('refreshToken', token);
      return true;
    } catch (error) {
      return false;
    }
  };

  static retrieveRefreshToken = async () => {
    try {
      const value = await AsyncStorage.getItem('refreshToken');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      return null;
    }
  };

  static retrieveUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        // We have data!!
        // console.log("user token retrieved succesfully ==> ", value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
      // console.log("could not retrieve user token ==> ", error);
      return null;
    }
  };

  static _clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
      return true;
    } catch (error) {
      return false;
    }
  };
}
