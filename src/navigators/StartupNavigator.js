import { createSwitchNavigator } from 'react-navigation';
import AuthenticationNavigator from './authentication/AuthenticationNavigator';
import MainNavigator from './main/MainNavigator';

export default createSwitchNavigator(
  {
    AuthStack: AuthenticationNavigator,
    MainStack: MainNavigator
  },
  {
    initialRouteName: "AuthStack"
  });
