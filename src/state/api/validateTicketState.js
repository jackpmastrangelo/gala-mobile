import TicketApi from '../../api/gala/TicketApi';

//Action Types
const VALIDATE_TICKET_REQUEST = "VALIDATE_TICKET_REQUEST",
      VALIDATE_TICKET_OK = "VALIDATE_TICKET_OK",
      VALIDATE_TICKET_ERROR = "VALIDATE_TICKET_ERROR",
      VALIDATE_TICKET_RESET = "VALIDATE_TICKET_RESET";

//Reducer
const initState = {
  fetching: false,
  success: false,
  error: false,
  errorMessage: false
};

export function validateTicketReducer(state = initState, action) {
  switch (action.type) {
    case VALIDATE_TICKET_REQUEST:
      return Object.assign({}, state, { fetching: true, success: false, error: false });
    case VALIDATE_TICKET_OK:
      return Object.assign({}, state, { fetching: false, success: true, error: false });
    case VALIDATE_TICKET_ERROR:
      return Object.assign({}, state, { fetching: false, success: false, error: true, errorMessage: action.message });
    case VALIDATE_TICKET_RESET:
      return initState;
    default:
      return state;
  }
}

//Action Creators
export function validateTicket(eventId, ticketId, authToken) {
  return function(dispatch) {
    dispatch(validateTicketBegun());
    TicketApi.validateTicket(eventId, ticketId, authToken)
      .then(response => {
        dispatch(validateTicketSuccessful());
        console.log("Success");
      })
      .catch(error => {
        //TODO differentiate based on different errors.
        dispatch(validateTicketError("There was an error validating your ticket"));
        console.log(JSON.stringify(error));
      });
  }
}

function validateTicketBegun() {
  return {
    type: VALIDATE_TICKET_REQUEST
  }
}

function validateTicketSuccessful() {
  return {
    type: VALIDATE_TICKET_OK
  }
}

function validateTicketError(message) {
  return {
    type: VALIDATE_TICKET_ERROR,
    message: message
  }
}

export function validateTicketReset() {
  return {
    type: VALIDATE_TICKET_RESET
  }
}