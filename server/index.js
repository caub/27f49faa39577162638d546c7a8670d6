const cors = require('express-mids/lib/cors');
const path = require('path');
const express = require('express');
const session = require('express-session');
const Twit = require('twit');
const {ORIGINS_RE, TWITTER_KEY, TWITTER_SECRET} = require('./config');
const Store = require('./util/session-store');

const app = express().disable('x-powered-by');

if (process.env.NODE_ENV !== 'production') {
	app.set('json spaces', 2);
}

app.use(require('compression')());

const root = path.resolve(path.join(__dirname, '..'));

app.use('/', express.static(root + '/dist')); // serve app production bundle
app.use('/', express.static(__dirname + '/public', {extensions: ['html']}));


app.use(cors({
	ORIGINS: ORIGINS_RE
}));

app.use(session({
	secret: 'some secret',
	key: '_k',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 1 * 86400e3 // 1 day
	},
	store: new Store()
}));

app.get('/session', (req, res) => {
	const {user_id, token, token_secret} = req.session || {};
	res.status(user_id && token && token_secret ? 200 : 403).json({user_id, token, token_secret});
});

const twitMiddleware = (req, res, next) => {
	if (!req.session.user_id) {
		return next(); // I still want to allow root url, so not next(err), but it's not ideal
	}
	req.twit = new Twit({
		consumer_key: TWITTER_KEY,
		consumer_secret: TWITTER_SECRET,
		access_token: req.session.token,
		access_token_secret: req.session.token_secret,
		timeout_ms: 20000
	});
	next();
};

app.use('/', twitMiddleware, require('./routes/api'));

app.get('/', (req, res) => {
	res.send(`
		hello
		${req.session && req.session.user_id}
		this should be overriden by app
`);
});

// signout
app.get(['/signout', '/logout', '/disconnect'], (req, res) => {
	// didn't manage to unauthorize twitter application, oauth2/invalidate_token possibly
	req.session.destroy(err => {
		res.format({
			default: () => res.status(err ? 500 : 204).end(),
			html: () => res.redirect(req.query.r || '/')
		});
	});
});


app.use(['/signin/twitter', '/auth/twitter', '/oauth_request'], require('./routes/auth-twitter'));


/**
 * start app
 * @param port (optional, defaults to process.env.PORT || 3000)
 * @returns server
 */
const start = (port = process.env.PORT || 3000) => {
	return app.listen(port);
};

module.exports = start;

if (!module.parent) { // if this module is directly invoked, start the server
	const server = start();
	console.log('listening:', server.address().port, 'fs:', root);
}
