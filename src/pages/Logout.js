import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Typography, Link, Box } from '@mui/material'; // Using Material-UI components

const Logout = () => {
  useEffect(() => {
    // Clear the JWT cookie by setting its expiry to a past date
    Cookies.remove('jwtToken', { path: '/' });
  }, []);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h1">Success!</Typography>
      <Typography variant="body1" mt={2}>
        You have been successfully logged out.
      </Typography>
      <Link href="/app/login" mt={3} underline="hover">
        Click here to signin
      </Link>
    </Box>
  );
};

export default Logout;
