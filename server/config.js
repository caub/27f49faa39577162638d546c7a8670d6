const DB_URL = process.env.DB_URL || `pg://postgres@localhost/twitt${process.env.NODE_ENV === 'test' ? '_test' : ''}`;

exports.DB_URL = DB_URL;

exports.knex = require('knex')(DB_URL);

exports.TWITTER_KEY = process.env.TWITTER_KEY || '362TmnonhpzgFNFIMBnnKBNRl';
exports.TWITTER_SECRET = process.env.TWITTER_SECRET || 'JHrQD9us5kXKPQG5qp8hhuBE9A89WnYrBYjmZTLWL2jPCD6813'; // I'll remove this key later

// for CORS
exports.ORIGINS_RE = /\/$twitt.xyz|\/localhost:\d+$/;
