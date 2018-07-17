import { AsyncStorage } from 'react-native';

export default class Session {
  static async _sessionExists() {
    const tokenValue = await AsyncStorage.getItem("gala-session");
    return (tokenValue != null);
  }

  static async _setSession(token) {
    await AsyncStorage.setItem("gala-session", token);
  }

  static async _getSessionValue() {
    return await AsyncStorage.getItem("gala-session");
  }

  static async _deleteSession() {
    await AsyncStorage.removeItem("gala-session");
  }
}