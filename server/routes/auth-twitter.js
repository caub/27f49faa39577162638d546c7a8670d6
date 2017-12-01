const router = require('express').Router();
const request = require('request');
const qs = require('querystring');
const {TWITTER_KEY, TWITTER_SECRET} = require('../config');

// todo we could reuse tokens in sessions after logging out (so not deleting them)

router.get('/', (req, res, next) => {
	const s = qs.stringify(req.query);
	request.post({
		url: 'https://api.twitter.com/oauth/request_token',
		oauth: {
			consumer_key: TWITTER_KEY,
			consumer_secret: TWITTER_SECRET,
			callback: `http://localhost:${process.env.PORT || 3000}/signin/twitter/callback${s ? '?' + s : ''}`
		}
	}, (e, r, body) => {
		if (e) {
			return res.send(`error: ${e.message}\n${process.env.NODE_ENV !== 'production' && e.stack}`);
		}
		const {oauth_token} = qs.parse(body);
		res.redirect(`https://api.twitter.com/oauth/authorize?${qs.stringify({oauth_token})}`);
	});
});

router.get('/callback', (req, res, next) => {
	request.post({
		url: 'https://api.twitter.com/oauth/access_token',
		oauth: {
			consumer_key: TWITTER_KEY,
			consumer_secret: TWITTER_SECRET,
			token: req.query.oauth_token,
			token_secret: req.query.oauth_token_secret || '', // not set yet?
			verifier: req.query.oauth_verifier
		}
	}, (e, r, body) => {
		if (e) { // todo 404 page, use jsx template engine
			return res.send(`error: ${e.message}\n${process.env.NODE_ENV !== 'production' && e.stack}`);
		}
		const {user_id, oauth_token, oauth_token_secret} = qs.parse(body);
		req.session.user_id = user_id;
		req.session.token = oauth_token;
		req.session.token_secret = oauth_token_secret;
		// req.session.save(() => {
		res.redirect(req.query.r || '/');
		// });
	});
});

module.exports = router;
