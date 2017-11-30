const redis = require('redis');

exports.client = redis.createClient(process.env.PORT);

exports.TWITTER_KEY = process.env.TWITTER_KEY || '362TmnonhpzgFNFIMBnnKBNRl';
exports.TWITTER_SECRET = process.env.TWITTER_SECRET || 'JHrQD9us5kXKPQG5qp8hhuBE9A89WnYrBYjmZTLWL2jPCD6813'; // I'll remove this key later

// for CORS
exports.ORIGINS_RE = /\/$twitt.xyz|\/localhost:\d+$/;
