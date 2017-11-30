const router = require('express').Router();
const passport = require('passport');
const {TWITTER_KEY, TWITTER_SECRET} = require('../config');
const User = require('../models/User');

// pass TwitterStrategy to be able to mock it in tests, default to real one
module.exports = (TwitterStrategy = require('passport-twitter').Strategy) => {
	passport.use(new TwitterStrategy({
		consumerKey: TWITTER_KEY,
		consumerSecret: TWITTER_SECRET,
		callbackURL: 'http://localhost:3000/signin/twitter/callback',
		userAuthorizationURL: '	https://api.twitter.com/oauth/authorize',
		includeEmail: true,
		passReqToCallback: true,
		session: false
	}, (req, token, tokenSecret, profile, cb) => {
		const user = profile._json;
		User.signin({
			id: user.id_str, // use id_str because bigInteger
			email: user.email,
			username: user.screen_name,
			name: user.name,
			avatar: user.profile_image_url_https || user.profile_image_url,
			token,
			tokenSecret
		})
		// console.log('TWITTER', token, tokenSecret, user.id_str);
		cb(null, profile._json); 
	}));

	router.get('/', (req, res, next) => {
		passport.authenticate('twitter', {display: 'popup'})(req, res, next);
	});

	router.get('/callback', (req, res, next) => {
		passport.authenticate('twitter', (err, user, info) => {
			console.log(err, user, info);
			if (err) { // todo 404 page, use jsx template engine
				return res.send(`error: ${err.message}\n${process.env.NODE_ENV !== 'production' && err.stack}`);
			}
			console.log('TWIITTER login, set session here, redirecting now', typeof user.id);
			req.session.user_id = user.id;
			res.redirect('/');
			
		})(req, res, next);
	});


	return router;
};
