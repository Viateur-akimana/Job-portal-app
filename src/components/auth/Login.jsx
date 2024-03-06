import React, { useState } from "react";
import { Container, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link } from "@mui/material"; // Import Material-UI components
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password
      });
  
      const token = response.data.token; // Extract JWT token from response
  
      if (token) {
        // Store JWT token securely (e.g., in local storage)
        localStorage.setItem('token', token);
  
        // Redirect user to home page or perform other actions
        alert('Login Successful!');
        navigate('/');
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error if needed
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <RouterLink to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
