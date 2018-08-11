import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Session from './Session';
import { loginReducer } from "./api/loginState";
import { createAccountReducer } from "./api/createAccountState";
import { sessionReducer } from "./Session";
import { fetchEventsReducer } from "./api/fetchEventsState";

//This is a special action for global state reset, used upon user logout.
const GLOBAL_STATE_RESET = "GLOBAL_STATE_RESET";

export function globalStateReset() {
  return {
    type: GLOBAL_STATE_RESET
  }
}

const appReducer = combineReducers({
  sessionState: sessionReducer,
  loginState: loginReducer,
  createAccountState: createAccountReducer,
  fetchEventsState: fetchEventsReducer
});

const rootReducer = (state, action) => {
  if (action.type === GLOBAL_STATE_RESET) {
    Session._deleteSession().catch((error) => { console.log(error) });
    state = undefined;
  }

  return appReducer(state, action);
};

export const galaStore = createStore(rootReducer, applyMiddleware(thunk));