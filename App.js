import React, { useState } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { LoginNavigator } from './src/LoginNavigator';

import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

export default function App() {
  const [appReady, setAppReady] = useState(false)
  const [asyncData, setAsyncData] = useState({ id: '', name: '', email: '', photoUrl: '' })

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('esencialCredentials')
      .then((result) => {
        if (result !== null) {
          setAsyncData(JSON.parse(result))
        }
      })
      .catch(error => console.log(error))
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn} />
    )
  }

  return (
    <Provider store={store}>
      <LoginNavigator asyncData={asyncData} />
    </Provider>
  );
}
