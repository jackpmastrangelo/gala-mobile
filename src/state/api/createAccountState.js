import AccountApi from '../../api/gala/AccountApi';
import { newLogin } from "./loginState";

//Action Types
const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST",
  CREATE_ACCOUNT_RESPONSE_OK = "CREATE_ACCOUNT_RESPONSE_OK",
  CREATE_ACCOUNT_ERROR = "CREATE_ACCOUNT_ERROR";

//Reducers
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  success: false
};

export function createAccountReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case CREATE_ACCOUNT_RESPONSE_OK:
      return Object.assign({}, state, { fetching: false, error: false, success: true });
    case CREATE_ACCOUNT_ERROR:
      return Object.assign({}, state, { fetching: false, error: true, message: action.message });
    default:
      return state;
  }
}

//Action Creators
export function createAccount(firstName, lastName, email, password) {

  return function (dispatch) {
    dispatch(createAccountBegun());

    AccountApi.createAccount(firstName, lastName, email, password)
      .then(response => {
        dispatch(newLogin(response.data));
        dispatch(createAccountSuccess());
      })
      .catch(error => {
        dispatch(createAccountError(interpretError(error.response)));
      })
  }
}

function interpretError(response) {
  switch (response.status) {
    case 409:
      return "That email is already in use. Try logging in!";
    case 400:
      return "The email you've entered is invalid :(";
    default:
      return "Uh oh. Something went wrong. Please try again and let us know!";
  }
}

//Use this to signify the account creation Api call is being made.
export function createAccountBegun() {
  return {
    type: CREATE_ACCOUNT_REQUEST
  }
}

//Use this to signify the account creation Api call was successful
export function createAccountSuccess() {
  return {
    type: CREATE_ACCOUNT_RESPONSE_OK
  }
}

//Use this to signify the account creation Api call errored.
export function createAccountError(message) {
  return {
    type: CREATE_ACCOUNT_ERROR,
    message: message
  }
}