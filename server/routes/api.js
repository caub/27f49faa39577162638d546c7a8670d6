const router = require('express').Router();
const request = require('request');
const {TWITTER_KEY, TWITTER_SECRET} = require('../config');

router.use(require('body-parser').json());

router.get(['/profile', '/connect'], (req, res) => {
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

router.get('/tweets', (req, res) => {
	req.twit.get('statuses/home_timeline', {count: 100, trim_user: 1}, (err, data) => {
		res.json(data);
	});
});

router.get('/tweets/:id', (req, res) => {
	req.twit.get('statuses/show/' + req.params.id, (err, data) => {
		res.json(data);
	});
});

router.post('/tweets', (req, res) => {
	req.twit.post('statuses/update', req.body, (err, data) => {
		if (err) {
			return res.status(400).json(err);
		}
		res.json(data);
	});
});

router.delete('/tweets/:id', (req, res) => {
	req.twit.post('statuses/destroy/' + req.params.id, (err, data) => {
		if (err) {
			return res.status(403).json(err);
		}
		res.json(data);
	});
});

module.exports = router;
