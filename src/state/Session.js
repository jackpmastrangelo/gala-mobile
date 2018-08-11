import { AsyncStorage } from 'react-native';

//Code for interacting with AsyncStorage.
export class Session {
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

//Redux Code for management of Authentication upon app load.
//Action Types
const FETCHING_FROM_STORAGE = "FETCHING_FROM_STORAGE",
  CREDENTIALS_FOUND = "CREDENTIALS_FOUND",
  NO_CREDENTIALS_FOUND = "NO_CREDENTIALS_FOUND";

const initState = {
  fetching: false,
  success: false,
  token: null,
  noneFound: false
};

//Reducers
export function sessionReducer(state = initState, action) {
  switch(action.type) {
    case FETCHING_FROM_STORAGE:
      return Object.assign({}, state, { fetching: true, success: false, token: null, noneFound: false });

    case CREDENTIALS_FOUND:
      return Object.assign({}, state, { fetching: false, success: true, token: action.token, noneFound: false });

    case NO_CREDENTIALS_FOUND:
      return Object.assign({}, state, { fetching: false, success: false, token: null, noneFound: true });

    default:
      return state;
  }
}

//Action Creators
export function fetchSessionFromStorage() {
  return function(dispatch) {
    Session._getSessionValue()
      .then(maybeToken => {
        if (maybeToken) {
          dispatch(credentialsFound(maybeToken));
        } else {
          dispatch(noCredentialsFound());
        }
      })
      .catch(error => {
        dispatch(noCredentialsFound());
      })
  }
}

export function credentialsFound(token) {
  return {
    type: CREDENTIALS_FOUND,
    token: token
  }
}

export function noCredentialsFound() {
  return {
    type: NO_CREDENTIALS_FOUND
  }
}