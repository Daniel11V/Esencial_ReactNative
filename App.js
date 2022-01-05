import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { LoginNavigator } from './src/LoginNavigator';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])
LogBox.ignoreLogs(['You cannot check for updates in development'])

export default function App() {
  return (
    <Provider store={store}>
      <LoginNavigator />
    </Provider>
  );
}
