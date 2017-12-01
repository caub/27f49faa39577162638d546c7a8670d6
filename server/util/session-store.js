const {Store} = require('express-session');
const {client} = require('../config');

const prefix = 'sess.';

// quick session store, could use connect-redis
module.exports = class RedisStore extends Store {
	destroy(sid, cb) {
		client.del(prefix + sid, cb);
	}
	get(sid, cb) {
		client.hgetall(prefix +  sid, (err, data) => {
			// console.log('get', sid, data);
			if (data && data.user_id && data.token && data.token_secret) {
				data.cookie = JSON.parse(data.cookie);
				return cb(null, data);
			}
			cb(err);
		});
	}
	set(sid, {cookie, user_id, token, token_secret}, cb) {
		// console.log('set', sid, user_id, token, token_secret);
		const expire = Math.floor((cookie.maxAge || 86400e3) / 1000);
		client.hmset(prefix + sid, {cookie: JSON.stringify(cookie), user_id, token, token_secret}, (err) => {
			if (err) {
				return cb(err);
			}
			client.expire(sid, expire);
			cb();
		});
	}
};
