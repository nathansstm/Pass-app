import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, Box } from '@mui/material';
import forge from 'node-forge';

const CertificateGeneratorCustom = () => {
  const [crt, setCrt] = useState('');
  const [key, setKey] = useState('');
  const [commonName, setCommonName] = useState('localhost');
  const [countryName, setCountryName] = useState('US');
  const [organizationName, setOrganizationName] = useState('My Company');
  const [encryptionMethod, setEncryptionMethod] = useState('RSA');
  const [keySize, setKeySize] = useState('2048');

  const generateCertificate = () => {
    // Generate a keypair and self-signed certificate based on selected encryption method and key size
    let keys;
    if (encryptionMethod === 'RSA') {
      keys = forge.pki.rsa.generateKeyPair(parseInt(keySize, 10));
    } else {
      // Handle other encryption methods if applicable
      // For example, for AES, you typically use a symmetric key instead of keypair
      console.log(`Encryption method ${encryptionMethod} is not implemented in this example.`);
      return;
    }

    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    const attrs = [
      { name: 'commonName', value: commonName },
      { name: 'countryName', value: countryName },
      { name: 'organizationName', value: organizationName },
    ];

    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(keys.privateKey);

    // Convert to PEM format
    const pemCrt = forge.pki.certificateToPem(cert);
    const pemKey = forge.pki.privateKeyToPem(keys.privateKey);

    setCrt(pemCrt);
    setKey(pemKey);
  };

  return (
    <Box>
      <TextField
        label="Common Name"
        value={commonName}
        onChange={(e) => setCommonName(e.target.value)}
        placeholder="localhost"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Country Name"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        placeholder="US"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Organization Name"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        placeholder="My Company"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      
      <FormLabel component="legend">Encryption Method</FormLabel>
      <RadioGroup value={encryptionMethod} onChange={(e) => setEncryptionMethod(e.target.value)}>
        <FormControlLabel value="RSA" control={<Radio />} label="RSA" />
        <FormControlLabel value="AES" control={<Radio />} label="AES" />
        <FormControlLabel value="3DES" control={<Radio />} label="3DES" />
        <FormControlLabel value="Camellia" control={<Radio />} label="Camellia" />
        <FormControlLabel value="ECDSA" control={<Radio />} label="ECDSA" />
      </RadioGroup>
      
      <FormLabel component="legend">Key Size</FormLabel>
      <RadioGroup value={keySize} onChange={(e) => setKeySize(e.target.value)}>
        <FormControlLabel value="512" control={<Radio />} label="512" />
        <FormControlLabel value="1024" control={<Radio />} label="1024" />
        <FormControlLabel value="2048" control={<Radio />} label="2048" />
        <FormControlLabel value="4096" control={<Radio />} label="4096" />
      </RadioGroup>

      <Button variant="contained" color="primary" onClick={generateCertificate}>
        Generate
      </Button>

      <TextField
        label="Certificate (server.crt)"
        multiline
        fullWidth
        rows={10}
        value={crt}
        InputProps={{ readOnly: true }}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Private Key (server.key)"
        multiline
        fullWidth
        rows={10}
        value={key}
        InputProps={{ readOnly: true }}
        variant="outlined"
        margin="normal"
      />
    </Box>
  );
};

export default CertificateGeneratorCustom;


