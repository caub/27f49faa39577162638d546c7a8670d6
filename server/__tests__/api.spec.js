const nock = require('nock');
const eq = require('deep-eq');

const PORT = 3001;

const _fetch = require('fetch-cookie/node-fetch')(require('node-fetch'));
const fetch = (url, opts = {}) => _fetch(`http://localhost:${PORT}${url}`, opts);

const startServer = require('..');

nock('https://api.twitter.com')
	.post('/oauth/request_token').query(true).reply(200, {oauth_token: 'abc'})
	.post('/oauth/access_token').query(true).reply(200,  'user_id=11&oauth_token=ab&oauth_token_secret=xy', {'Content-Type': 'application/x-www-form-urlencoded'})
	.get('/oauth/authorize').query(true).reply(302, undefined, {
		Location: `http://localhost:${PORT}/signin/twitter/callback`
	})

	.get('/1.1/statuses/home_timeline.json').query(true).reply(200, [{text: 'test'}])
	.get('/1.1/account/verify_credentials.json').query(true).reply(200, {id: '11', id_str: '11'});


let server;

beforeAll(async () => {
	server = startServer(PORT);
});
afterAll(async () => {
	server.close();
});

it('should authenticate with Twitter', async () => {
	const u1 = await fetch('/session').then(r => r.json());
	eq(u1.user_id, undefined);

	const r = await fetch('/signin/twitter');
	eq(r.status, 200);

	const u2 = await fetch('/session').then(r => r.json());
	eq(u2.user_id, '11');
});

it('should list tweets', async () => {
	const tweets = await fetch('/tweets').then(r => r.json());
	eq(tweets.length, 1);
});

it('should show profile', async () => {
	const user = await fetch('/connect').then(r => r.json());
	eq(user.id_str, '11');
});
