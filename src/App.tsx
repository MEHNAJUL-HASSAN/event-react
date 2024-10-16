// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext"; // Ensure proper import
import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/actions/authActions";
import LogoutIcon from "@mui/icons-material/Logout";
const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const logo =
    "https://mysmart.app/wp-content/uploads/2020/09/smartapps_events-app-icon_events-app-icon-180x180.png";

  return (
    <AppBar position="static" style={{ backgroundColor: "#333" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Event Hub{" "}
        </Typography>
        {isAuthenticated && (
          <Button
            color="inherit"
            onClick={() => dispatch(logout())}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/events"
            element={<PrivateRoute element={<EventList />} />}
          />
          <Route
            path="/event/:id"
            element={<PrivateRoute element={<EventDetails />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
