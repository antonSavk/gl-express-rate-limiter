const mongoose = require('mongoose');

const RateLimitLogSchema = new mongoose.Schema({
    ip: String,
    path: String,
    status: Number,
    timestamp: { type: Date, default: Date.now }
});

const RateLimitLog = mongoose.model('RateLimitLog', RateLimitLogSchema);

module.exports = function rateLimitMonitor(options) {
    mongoose.connect(options.database, { useNewUrlParser: true, useUnifiedTopology: true });

    return function(req, res, next) {
        const log = new RateLimitLog({
            ip: req.ip,
            path: req.path,
            status: res.statusCode
        });

        log.save(err => {
            if (err) {
                console.error('Error logging rate limit:', err);
            }
            next();
        });
    };
};
