const router = require('express').Router();
const passport = require('passport');
const {TWITTER_KEY, TWITTER_SECRET} = require('../config');

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
		console.log('TWITTER', profile._json);
		cb(null, profile._json); // use id_str because bigInteger
	}));

	router.get('/', (req, res, next) => {
		passport.authenticate('twitter', {display: 'popup'})(req, res, next);
	});

	router.get('/callback', (req, res, next) => {
		passport.authenticate('twitter', (err, user, info) => {
			console.log(err, user, info);
			if (err) {
				return res.send(`error: ${err.message}\n${process.env.NODE_ENV !== 'production' && err.stack}`);
			}
			console.log('TWIITTER login, set session here, redirecting now');
			// req.session.user_id = user.id;
			res.redirect('/');
			
		})(req, res, next);
	});


	return router;
};
