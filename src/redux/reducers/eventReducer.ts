import { BOOK_TICKET } from "../actions/eventActions";
import eventsData from "../../data/events.json";

const initialState = eventsData;

const eventReducer = (
  state = initialState,
  action: { type: any; payload: number }
) => {
  switch (action.type) {
    case BOOK_TICKET: {
      return state.map((event) =>
        event.id === action.payload && event.availableSeats > 0
          ? { ...event, availableSeats: event.availableSeats - 1 }
          : event
      );
    }
    default:
      return state;
  }
};

export default eventReducer;
