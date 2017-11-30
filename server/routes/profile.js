const router = require('express').Router();
const request = require('request');
const {TWITTER_KEY, TWITTER_SECRET} = require('../config');

router.all('*', (req, res, next) => {
	if (!req.session.user_id) {
		return res.status(403).send('Not signed in');
	}
	next();
});

router.get('/', (req, res) => {
	// to get email also
	request.get({
		url: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=1&skip_status=1',
		oauth: {
			consumer_key: TWITTER_KEY,
			consumer_secret: TWITTER_SECRET,
			token: req.session.token,
			token_secret: req.session.token_secret,
		},
		json: true
	}, (e, r, user) => {
		if (e) {
			return res.status(403).json(e);
		}

		/*
			id: user.id_str, // use id_str because bigInteger
			email: user.email,
			username: user.screen_name,
			name: user.name,
			avatar: user.profile_image_url_https || user.profile_image_url,
		*/
		// todo cache it in redis

		res.json(user);
	});

	// req.twit.get('users/show', {user_id: req.session.user_id}, (err, data) => {
	// 	if (err) {
	// 		return res.status(403).json(err);
	// 	}
	// 	res.json(data);
	// });
});

module.exports = router;
