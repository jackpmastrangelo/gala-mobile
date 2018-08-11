import { galaAxios } from "./galaApi";

export default class EventApi {

  //TODO: Maybe the class should be constructed instead and authTokens won't have to be passed in?
  static retrieveUserEvents(authToken) {
    return galaAxios.get("/events/users", {
      validateStatus: (status) => {
        return status === 200
      },
      headers: {
        Authorization: ("Bearer " + authToken)
      }
    });
  }

  static createNewUserEvent(name, place, eventTime, capacity, authToken) {
    return galaAxios.post("/events/users", {}, {
      params: {
        name: name,
        place: place,
        eventTime: eventTime,
        capacity: capacity
      },
      headers: {
        Authorization: ("Bearer " + authToken)
      }
    });
  }

  static retrieveEventById(eventId, authToken) {
    return galaAxios.get("/events/" + eventId, {
      headers: {
        Authorization: ("Bearer " + authToken)
      }
    });
  }
}