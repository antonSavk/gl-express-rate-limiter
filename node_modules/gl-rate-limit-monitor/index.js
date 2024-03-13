const express = require('express');
const rateLimit = require('gl-express-rate-limiter');
const rateLimitMonitor = require('./rateLimitMonitor');

class ExpressRateLimitMonitor {
    constructor(options) {
        this.app = express();
        this.options = options;
    }

    start() {
        // Apply rate limiting middleware
        const limiter = rateLimit({
            windowMs: this.options.windowMs || 60 * 1000, // 1 minute
            max: this.options.max || 100,
            message: this.options.message || 'Too many requests, please try again later.',
            statusCode: this.options.statusCode || 429,
        });
        this.app.use(limiter);

        // Apply rate limiting monitoring middleware
        this.app.use(rateLimitMonitor({
            database: this.options.database || 'mongodb://localhost:27017/rate_limit_logs',
            interval: this.options.interval || '1h', // Log data every hour
        }));

        // Define your routes
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        // Start the server
        const PORT = this.options.port || process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

module.exports = ExpressRateLimitMonitor;
