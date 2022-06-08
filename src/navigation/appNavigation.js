import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { setTopLevelNavigator } from 'helpers/navigationService';

import AuthLoading from '../pages/AuthLoading/AuthLoading';
import NarrowCpr from '../pages/NarrowCpr/NarrowCpr';
import YesterdayLowCover from '../pages/YesterdayLowCover/YesterdayLowCover';

const {Screen, Navigator} = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        setTopLevelNavigator(navigatorRef);
      }}>
      <Navigator
        initialRouteName="About"
        headerMode="none"
        screenOptions={{
          animationEnabled: false,
        }}>
        <Screen name="About" component={AuthLoading} />
        <Screen name="NarrowCpr" component={NarrowCpr} />
        <Screen name="YesterdayLowCover" component={YesterdayLowCover} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

