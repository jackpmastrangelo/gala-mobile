import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { galaStore } from "./src/state/galaStore";
import StartupNavigator from './src/navigators/StartupNavigator';
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {
  render() {
    //TODO: Make sure to remove this
    //This is a dev workaround for getting over the token expiration bug
    AsyncStorage.clear();

    return (
      <Provider store={galaStore}>
        <StartupNavigator />
      </Provider>
    );
  }
}