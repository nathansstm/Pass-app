import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const TextToBinaryConverter = () => {
  const [plaintext, setPlaintext] = useState('');
  const [binaryResult, setBinaryResult] = useState('');

  const handleConvertToBinary = () => {
    const binary = plaintext.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    setBinaryResult(binary);
  };

  return (
    <div>
      <h2>Plaintext to Binary Converter</h2>
      <TextField
        label="Enter Plaintext"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleConvertToBinary} style={{ marginTop: '16px' }}>
        Convert to Binary
      </Button>
      <TextField
        label="Binary Result"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={binaryResult}
        style={{ marginTop: '16px' }}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default TextToBinaryConverter;


