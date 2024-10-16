export const BOOK_TICKET = "BOOK_TICKET";

export const bookTicket = (eventId: number) => ({
  type: BOOK_TICKET,
  payload: eventId,
});
