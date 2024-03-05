import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
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
    <div className="container margin-top">
      <h2>Contact Us</h2>
      {formSuccess && <p style={{ color: "green" }}>Message sent successfully!</p>}
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;
