import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
  Container,
  Typography,
  Skeleton,
} from "@mui/material";
import { Event } from "../types/Event";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const EventList: React.FC = () => {
  const events = useSelector((state: any) => state.events);
  const [category, setCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFilter, setLoadingFilter] = useState<boolean>(false);
  const [loadingPagination, setLoadingPagination] = useState<boolean>(false); // New state for pagination
  const itemsPerPage = 10;
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedCategory = event.target.value as string;
    setCategory(selectedCategory);
    await filterEvents(selectedCategory, searchTerm);
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    await filterEvents(category, searchValue);
  };

  const filterEvents = async (selectedCategory: string, term: string) => {
    setLoadingFilter(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const filtered = events.filter((event: any) => {
      const matchesCategory = selectedCategory
        ? event.category === selectedCategory
        : true;
      const matchesSearch = event.title
        .toLowerCase()
        .includes(term.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredEvents(filtered);
    setCurrentPage(1);
    setLoadingFilter(false);
  };

  const handlePageChange = async (page: number) => {
    setLoadingPagination(true); // Start loading for pagination
    setCurrentPage(page);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading delay
    setLoadingPagination(false); // Stop loading for pagination
  };

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        label="Search Events"
        value={searchTerm}
        onChange={handleSearchChange}
        size="small"
      />

      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="category-select-label" size="small">
          Category
        </InputLabel>
        <Select
          labelId="category-select-label"
          value={category}
          onChange={(data: any) => handleCategoryChange(data)}
          label="Category"
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {Array.from(new Set(events.map((event: any) => event.category))).map(
            (cat: any) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>

      {loading || loadingFilter || loadingPagination ? (
        <Grid container spacing={2}>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : isAuthenticated ? (
        <Grid container spacing={2}>
          {currentEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
          Please log in to see the events.
        </Typography>
      )}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant="outlined"
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {loadingPagination && (
        <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
          Loading more events...
        </Typography>
      )}
    </Container>
  );
};

export default EventList;