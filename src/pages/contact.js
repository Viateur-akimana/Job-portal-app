import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        setFormError("Please fill in all fields.");
        return;
      }

      // Send message
      const response = await axios.post("/api/contact", formData);

      // Check response and display success message
      if (response.status === 200) {
        setFormSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setFormError("");
      } else {
        setFormError("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormError("Failed to send message. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm" className="container margin-top">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      {formSuccess && (
        <Typography variant="body1" style={{ color: "green", marginBottom: 10 }}>
          Message sent successfully!
        </Typography>
      )}
      {formError && (
        <Typography variant="body1" style={{ color: "red", marginBottom: 10 }}>
          {formError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Contact;
