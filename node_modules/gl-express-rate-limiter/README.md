# Express Rate Limit Middleware

## Description

This package provides a simple rate limiting middleware for Express.js applications. It limits the number of requests from each IP address within a specified time window.

## Installation

```bash
npm install express-rate-limit-middleware
const express = require('express');
const rateLimit = require('express-rate-limit-middleware');

const app = express();

// Apply rate limiting middleware
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    message: 'Too many requests, please try again later.',
    statusCode: 429,
    headers: {
        'Retry-After': 60,
        'Content-Type': 'text/plain;charset=UTF-8',
    },
}));

// Define your routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


```

## Options

- `windowMs`: The time window for which to keep records of requests in milliseconds. Defaults to 1 minute.
- `maxRequests`: The maximum number of requests allowed within the specified time window. Defaults to 100.
- `message`: The message to send in the response when the limit is exceeded. Defaults to 'Too many requests, please try again later.'.
- `statusCode`: The status code to send in the response when the limit is exceeded. De
