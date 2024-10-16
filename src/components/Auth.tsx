import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Typography, Paper, Container } from "@mui/material";

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const Auth: React.FC = () => {
  const { login }: any = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      login();
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
