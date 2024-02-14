const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Import the cors middleware

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const API_BASE_URL =
  'https://appodixi.aade.gr/appodixiapps/QrCodesService/webresources/qrcode/ese_esi';

// Logging
app.use(morgan('dev'));
app.use(cors());
app.use(
  '/getData',
  createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/getData`]: '',
    },
    proxyOptions: {
      // Pass parameters to the proxy request
      query: {
        parameter1: 'value1',
        parameter2: 'value2',
        parameter3: 'value3',
      },
    },
  })
);

// New endpoint for handling POST requests
app.post('/postForm', (req, res) => {
  // Example condition for demonstrating a 400 error not needed for my testing purposes
  // if (!req.body.someRequiredField) {
  //   return res.status(400).send('Missing required field: someRequiredField');
  // }
  // Handle the POST request logic here

  // If everything is successful, send a 200 response
  res.status(200).send('Received POST request successfully.');
});

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
