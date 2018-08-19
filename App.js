import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { galaStore } from "./src/state/galaStore";
import StartupNavigator from './src/navigators/StartupNavigator';
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {
  render() {
    AsyncStorage.clear();

    return (
      <Provider store={galaStore}>
        <StartupNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A1213',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: '#FFEEA5'
  }
});