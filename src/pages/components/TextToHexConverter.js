import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const TextToHexConverter = () => {
  const [plaintext, setPlaintext] = useState('');
  const [hexResult, setHexResult] = useState('');

  const handleConvertToHex = () => {
    const hex = plaintext.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
    setHexResult(hex);
  };

  return (
    <div>
      <h2>Plaintext to Hexadecimal Converter</h2>
      <TextField
        label="Enter Plaintext"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleConvertToHex} style={{ marginTop: '16px' }}>
        Convert to Hexadecimal
      </Button>
      <TextField
        label="Hexadecimal Result"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={hexResult}
        style={{ marginTop: '16px' }}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default TextToHexConverter;


