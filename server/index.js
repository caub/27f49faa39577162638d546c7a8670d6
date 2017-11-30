const cors = require('express-mids/lib/cors');
const path = require('path');
const express = require('express');
const session = require('express-session');
const {ORIGINS_RE} = require('./config');
const Store = require('./util/session-store');

const app = express().disable('x-powered-by');

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

app.get(['/user', '/session'], (req, res) => {
	res.json(res.session);
});

app.get(['/profile', '/connect'], require('./routes/profile'));

app.use('/tweets', require('./routes/tweets'));

app.get('/', (req, res) => {
	res.send(`
		hello
		${req.session && req.session.user_id}
`);
});

// signout
app.get(['/signout', '/logout'], (req, res) => {
	req.session.destroy(err => {
		res.format({
			json: () => res.status(err ? 500 : 204).end(),
			default: () => res.redirect('/')
		});
	});
});

app.use(['/signin/twitter', '/auth/twitter', '/oauth_request'], require('./routes/auth-twitter'));


/**
 * start app
 * @param port (optional, defaults to process.env.PORT || 3000)
 * @returns server
 */
const start = (port = process.env.PORT || 3000, TwitterStrategy) => {
	return app.listen(port);
};

module.exports = start;

if (!module.parent) { // if this module is directly invoked, start the server
	const server = start();
	console.log('listening:', server.address().port, 'fs:', root);
}
