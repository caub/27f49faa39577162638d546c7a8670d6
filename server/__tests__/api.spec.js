const nock = require('nock');
const eq = require('deep-eq');

const PORT = process.env.PORT = 3001;

const startServer = require('..');
const {fetchHeaders: _fetchHeaders, toJson} = require('fetcho');

const fetchHeaders = (url, opts) => _fetchHeaders(`http://localhost:${PORT}${url}`, opts);
const fetch = (url, opts) => fetchHeaders(url, opts).then(toJson);

nock('https://api.twitter.com')
	.get('/oauth/request_token').reply(200, {oauth_token: 'abc'})
	.get('/oauth/authorize').reply(200, (uri, body) => {
		// call callback url
	});

let server;

beforeAll(async () => {
	server = startServer(PORT);
});
afterAll(async () => {
	server.close();
});
