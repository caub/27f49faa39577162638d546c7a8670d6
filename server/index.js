const cors = require('express-mids/lib/cors');
const path = require('path');
const express = require('express');
const session = require('express-session');
const {ORIGINS_RE, knex} = require('./config');

// quick session store, doing a practical join to get full user data
class PGStore extends session.Store {
	destroy(sid, cb) {
		return knex('sessions').where('id', sid).delete().then(() => cb());
	}
	get(sid, cb) { // todo make it more knexy
		return knex.raw(`SELECT user_id, cookie, username, name, email, avatar, token, token_secret FROM sessions LEFT JOIN users ON users.id=sessions.user_id WHERE sessions.id=? AND expire > now()`, sid)
			.then(({rows}) => cb(null, rows[0]));
	}
	set(sid, {user_id, cookie}, cb) {
		const expire = new Date(Date.now() + cookie.maxAge);
		return knex.raw(`INSERT INTO sessions (id, user_id, cookie, expire) VALUES (?, ?, ?, ?)
					ON CONFLICT (id)
					DO UPDATE SET user_id = EXCLUDED.user_id, cookie = EXCLUDED.cookie, expire = EXCLUDED.expire`, [sid, user_id, cookie, expire])
			.then(({rows}) => cb(null, rows[0]));
	}
}

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
	store: new PGStore()
}));


app.get('/', (req, res) => {
	res.send(`
		hello
		${JSON.stringify(req.session)}
`);
});

// signout
app.get(['/signout', '/logout'], (req, res) => {
	req.session.destroy(err => {
		res.status(err ? 500 : 204).end();
	});
});


/**
 * start app
 * @param port (optional, defaults to process.env.PORT || 3000)
 * @param TwitterStrategy (optional)
 * @returns server
 */
const start = (port = process.env.PORT || 3000, TwitterStrategy) => {

	app.use(['/signin/twitter', '/auth/twitter'], require('./routes/auth-twitter')(TwitterStrategy));

	return app.listen(port);
};

module.exports = start;

if (!module.parent) { // if this module is directly invoked, start the server
	const server = start();
	console.log('listening', server.address().port, 'root', root);
}
