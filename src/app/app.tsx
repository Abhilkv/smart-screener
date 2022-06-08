
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import AppNavigation from 'navigation/appNavigation';

import store from '../store/index';

const persistor = persistStore(store);

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;