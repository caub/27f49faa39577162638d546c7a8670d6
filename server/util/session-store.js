const {Store} = require('express-session');
const Twit = require('twit');
const {client, TWITTER_KEY, TWITTER_SECRET} = require('../config');

// quick session store, could use connect-redis
module.exports = class RedisStore extends Store {
	destroy(sid, cb) {
		client.del(sid, cb);
	}
	get(sid, cb) {
		client.hgetall(sid, (err, data) => {
			// console.log('get', sid, data);
			if (data && data.user_id && data.token && data.token_secret) {
				data.cookie = JSON.parse(data.cookie);
				data.twit = new Twit({
					consumer_key: TWITTER_KEY,
					consumer_secret: TWITTER_SECRET,
					access_token: data.token,
					access_token_secret: data.token_secret,
					timeout_ms: 20000
				});
				return cb(null, data);
			}
			cb(err);
		});
	}
	set(sid, {cookie, user_id, token, token_secret}, cb) {
		// console.log('set', sid, user_id, token, token_secret);
		const expire = Math.floor((cookie.maxAge || 86400e3) / 1000);
		client.hmset(sid, {cookie: JSON.stringify(cookie), user_id, token, token_secret}, (err) => {
			if (err) {
				return cb(err);
			}
			client.expire(sid, expire);
			cb();
		});
	}
};
