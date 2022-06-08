import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer} from 'redux-persist';
import storage from '@react-native-community/async-storage';
import reducers from '../reducers';

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage,
  whitelist: ['auth', 'check'], // only these will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)));

export default store;
