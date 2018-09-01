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
      })
      .catch(error => {
        //TODO differentiate based on different errors.
        dispatch(validateTicketError(interpretError(error.response)));
      });
  }
}

function interpretError(response) {
  switch (response.status) {
    case 406:
      return "This ticket has already been validated!";
    case 409:
      return "This ticket is for a different event";
    case 404:
      return "Looks like this isn't a Gala ticket. Hmmm";
    default:
      return "Uh oh. Something went wrong. Please try again and let us know!";
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