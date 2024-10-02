// ./pages/App.js
import React from 'react';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container className="App" sx={{ marginTop: 4 }}>
      <Typography variant="h1" gutterBottom>
        Hello, World!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="h6" gutterBottom>
        Welcome to Our Simple SaaS Platform! ⚛️
      </Typography>
      <Typography variant="body1" gutterBottom>
        This React-based application offers a simple, subscription-based SaaS model. It's designed to make managing your 
        subscriptions and user data as easy as possible. Built with simplicity and scalability in mind, our platform grows with you. 
      </Typography>
      <Typography variant="body1" gutterBottom>
        We aim to deliver a clean, intuitive user experience. Whether you're managing payments or generating new subscribers, 
        this app makes it seamless. Our modern tech stack ensures fast, responsive functionality for all users.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The platform also provides robust security features ??, making sure your data and transactions remain safe. 
        Get started today and see how easy it is to take control of your SaaS business with our straightforward tools.
      </Typography>
    </Container>
  );
}

export default App;
