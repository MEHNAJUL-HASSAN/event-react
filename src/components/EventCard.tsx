import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { Event } from "../types/Event";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  // Determine card styles based on available seats
  const cardStyles =
    event.availableSeats === 0
      ? { backgroundColor: "#ffe9de", border: "1px solid #ffe9de" } // Light red background
      : { border: "1px solid #e3e3e3" };

  return (
    <Card sx={cardStyles}>
      <CardMedia
        component="img"
        height="140"
        image={event?.image}
        alt={event.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body1">
          Category: <span style={{ fontWeight: "bold" }}>{event.category}</span>
        </Typography>
        <Typography variant="body1">
          Date:{" "}
          <span style={{ fontWeight: "bold" }}>
            {new Date(event.date).toLocaleDateString()}
          </span>
        </Typography>
        <Typography variant="body1">
          Seats Available:{" "}
          <span style={{ fontWeight: "bold" }}>
            {event.availableSeats > 0 ? event.availableSeats : "Sold Out"}
          </span>
        </Typography>
        <Typography variant="body1">
          Price: <span style={{ fontWeight: "bold" }}>${event.price}</span>
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={() => navigate(`/event/${event.id}`)}
          size="small"
        >
          View more
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
