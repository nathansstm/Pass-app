// ./pages/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import PasswordGenerator from './components/PasswordGenerator';
import TextToHexConverter from './components/TextToHexConverter';
import TextToBinaryConverter from './components/TextToBinaryConverter';
import CertificateGenerator from './components/CertificateGenerator'; // Add the new component
import CertificateGeneratorCustom from './components/CertificateGeneratorCustom'; // Import the custom component

function Dashboard() {
  return (
    <Container className="App" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        SSL Certificate Generator
      </Typography>
      <CertificateGenerator /> {/* Use the preset component */}

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Custom SSL Certificate Generator
      </Typography>
      <CertificateGeneratorCustom /> {/* Use the customizable component */}

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Password Generator
      </Typography>
      <PasswordGenerator />

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Text to Hexadecimal Converter
      </Typography>
      <TextToHexConverter />

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Text to Binary Converter
      </Typography>
      <TextToBinaryConverter />
    </Container>
  );
}

export default Dashboard;
