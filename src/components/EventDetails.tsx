import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Paper, Container, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bookTicket } from "../redux/actions/eventActions";

const EventDetail: React.FC = () => {
  const { id }: any = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventId = parseInt(id, 10);
  const events = useSelector((state: any) => state.events);
  const event = events.find((event: { id: number }) => event.id === eventId);
  const [bookingMessage, setBookingMessage] = useState("");

  if (!event) {
    return (
      <Container>
        <Typography variant="h4" color="error">
          Event Not Found
        </Typography>
      </Container>
    );
  }

  const handleBookTicket = () => {
    if (event.availableSeats > 0) {
      dispatch(bookTicket(eventId));
      setBookingMessage("Ticket booked successfully!");
    } else {
      setBookingMessage("This event is fully booked.");
    }
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      style={{ padding: "32px", marginTop: "32px", textAlign: "center" }}
    >
      <img
        src={event.image}
        alt={event.title}
        style={{
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />
      <Typography variant="h4" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {event.category}
      </Typography>
      <Typography variant="body1" paragraph>
        {event.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Date: {event.date}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Available Seats: {event.availableSeats}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Price: ${event.price.toFixed(2)}
      </Typography>

      {bookingMessage && (
        <Typography variant="body2" color="error" style={{ margin: "16px 0" }}>
          {bookingMessage}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "16px", marginRight: "8px" }}
        onClick={handleBookTicket}
        disabled={event.availableSeats === 0}
      >
        {event.availableSeats > 0 ? "Book Ticket" : "Sold Out"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/events")}
        style={{ marginTop: "16px" }}
      >
        Back to Events
      </Button>
    </Container>
  );
};

export default EventDetail;
