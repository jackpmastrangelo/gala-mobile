import { createStackNavigator } from 'react-navigation';
import LoginScreen from "./LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";

export default createStackNavigator(
  {
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen
  },
  {
    initialRouteName: "Login"
  }
);