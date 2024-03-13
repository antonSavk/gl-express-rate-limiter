# Express Rate Limit Monitor

## Description

Express Rate Limit Monitor is an npm package that provides rate limiting functionality for Express.js applications along with monitoring and logging capabilities. It uses the `express-rate-limit` middleware for rate limiting and logs rate-limited requests to a MongoDB database.

## Installation

First, install the package and its dependencies using npm:

```bash
npm install express-rate-limit-monitor express express-rate-limit mongoose

const ExpressRateLimitMonitor = require('express-rate-limit-monitor');

const rateLimitMonitor = new ExpressRateLimitMonitor({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    message: 'Too many requests, please try again later.',
    statusCode: 429,
    database: 'mongodb://localhost:27017/rate_limit_logs',
    interval: '1h', // Log data every hour
    port: 3000
});

rateLimitMonitor.start();
```


## Options

- `windowMs`: The time window for which to keep records of requests in milliseconds. Defaults to 1 minute.
- `max`: The maximum number of requests allowed within the specified time window. Defaults to 100.
- `message`: The message to send in the response when the limit is exceeded. Defaults to 'Too many requests, please try again later.'.
- `statusCode`: The status code to send in the response when the limit is exceeded. Defaults to 429.
- `database`: The MongoDB connection string where rate limit logs will be stored. Defaults to 'mongodb://localhost:27017/rate_limit_logs'.
- `interval`: The interval at which rate limit data will be logged to the database. Defaults to '1h' (every hour).
- `port`: The port on which the Express server will listen. Defaults to 3000.
