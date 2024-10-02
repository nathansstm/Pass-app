import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import forge from 'node-forge';

const CertificateGenerator = () => {
  const [crt, setCrt] = useState('');
  const [key, setKey] = useState('');

  const generateCertificate = () => {
    // Generate a keypair and self-signed certificate
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const cert = forge.pki.createCertificate();

    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

    const attrs = [
      { name: 'commonName', value: 'localhost' },
      { name: 'countryName', value: 'US' },
      { shortName: 'ST', value: 'California' },
      { name: 'localityName', value: 'San Francisco' },
      { name: 'organizationName', value: 'My Company' },
      { shortName: 'OU', value: 'IT' }
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
    <>
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
      <Button variant="contained" color="primary" onClick={generateCertificate}>
        Generate
      </Button>
    </>
  );
};

export default CertificateGenerator;


