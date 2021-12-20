import { Provider } from 'react-redux';
import React from 'react';
import { TabNavigator } from './src/TabNavigator';
import store from './store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
}
