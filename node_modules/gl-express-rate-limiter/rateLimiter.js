class RateLimiter {
    constructor(options) {
        this.options = {
            windowMs: options.windowMs || 60 * 1000, // 1 minute
            maxRequests: options.maxRequests || 100,
            message: options.message || 'Too many requests, please try again later.',
            statusCode: options.statusCode || 429,
            headers: options.headers || {},
        };
        this.requests = {};
    }

    middleware(req, res, next) {
        const ip = req.ip;

        if (!this.requests[ip]) {
            this.requests[ip] = [];
        }

        const now = Date.now();
        const windowStart = now - this.options.windowMs;
        this.requests[ip] = this.requests[ip].filter((timestamp) => timestamp > windowStart);

        if (this.requests[ip].length >= this.options.maxRequests) {
            res.status(this.options.statusCode).set(this.options.headers).send(this.options.message);
        } else {
            this.requests[ip].push(now);
            next();
        }
    }
}

module.exports = (options) => {
    const limiter = new RateLimiter(options);

    return limiter.middleware;
};
