import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing js-cookie to manage cookies

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(''); // For displaying errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to /api/login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_id: identifier, // Sending identifier as payment_id
          token: passcode,        // Sending passcode as token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the JWT token in a cookie
        Cookies.set('jwtToken', data.token, { expires: 1 }); // Set cookie to expire in 1 day

        // Navigate to the protected members' dashboard
        navigate('/app/dashboard');
      } else {
        // Handle login failure (show error message)
        setError(data.error || 'Login failed, please try again.');
      }
    } catch (err) {
      setError('An error occurred, please try again.');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Identifier: </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Passcode: </label>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
