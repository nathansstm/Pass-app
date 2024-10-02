// ./components/PasswordGenerator.js
import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material';

const PasswordGenerator = () => {
  const [formData, setFormData] = useState({
    textInput: '',
    charType: '',      // For character type: Hexadecimal, Alphabet, Special Characters
    lengthOption: '10' // Default to 10 characters for length
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = generatePassword(formData.charType, formData.lengthOption);
    setFormData({ ...formData, textInput: password });
  };

  const generatePassword = (charType, length) => {
    let charset = '';
    switch (charType) {
      case 'hexadecimal':
        charset = '0123456789abcdef';
        break;
      case 'alphabet':
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case 'special':
        charset = '!@#$%^&*()-_=+[]{};:,.<>?';
        break;
      default:
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

    const passwordLength = parseInt(length, 10);
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Password Type Selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Select a character set:</FormLabel>
        <RadioGroup row name="charType" value={formData.charType} onChange={handleInputChange}>
          <FormControlLabel value="hexadecimal" control={<Radio />} label="Hexadecimal" />
          <FormControlLabel value="alphabet" control={<Radio />} label="Alphabet" />
          <FormControlLabel value="special" control={<Radio />} label="Special Characters" />
        </RadioGroup>
      </FormControl>

      {/* Password Length Selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Select password length:</FormLabel>
        <RadioGroup row name="lengthOption" value={formData.lengthOption} onChange={handleInputChange}>
          <FormControlLabel value="10" control={<Radio />} label="Ten Characters" />
          <FormControlLabel value="20" control={<Radio />} label="Twenty Characters" />
          <FormControlLabel value="50" control={<Radio />} label="Fifty Characters" />
        </RadioGroup>
      </FormControl>

      {/* Text Input to Display Generated Password */}
      <Box sx={{ marginTop: 2 }}>
        <TextField
          id="textInput"
          name="textInput"
          value={formData.textInput}
          label="Generated Password"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          InputProps={{
            readOnly: true,
          }}
          placeholder="Generated password will appear here"
        />
      </Box>

      {/* Submit Button */}
      <Box sx={{ marginTop: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Click Me
        </Button>
      </Box>
    </form>
  );
};

export default PasswordGenerator;


