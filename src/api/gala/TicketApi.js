import { galaAxios } from "./galaApi";

export default class TicketApi {

    static validateTicket(eventid, ticketid, authToken) {
        return galaAxios.put("/tickets/validate", {}, {
            params: {
                eventId: eventid,
                ticketId: ticketid
            },
            headers: {
                Authorization: ("Bearer " + authToken)
            }
        });
    }
}