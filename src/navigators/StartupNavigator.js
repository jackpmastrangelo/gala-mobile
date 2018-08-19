import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './authentication/AuthLoadingScreen';
import AuthenticationNavigator from './authentication/AuthenticationNavigator';
import MainNavigator from './main/MainNavigator';

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AuthStack: AuthenticationNavigator,
    MainStack: MainNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);
