import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Event
        </Typography>
        {isAuthenticated && (
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
