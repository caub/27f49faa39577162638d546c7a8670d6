process.env.PORT = process.env.PORT || 3002;

import eq from 'deep-eq';
import nock from 'nock';
import reducers from '../reducers';
import {
	SIGNIN,
	SET_PROFILE,
	SET_TWEETS,
	getSession,
	logout,
	getTweets
} from '../actions';


it('reducer after SIGNIN action', () => {
	const signinAction = {type: SIGNIN, value: {user_id: '11'}};
	eq(reducers(undefined, signinAction).session, signinAction.value);
});

it('reducer after SIGNIN action to undefined (signout)', () => {
	const signoutAction = {type: SIGNIN, value: undefined};
	eq(reducers(undefined, signoutAction).session, signoutAction.value);
});

it('reducer after SET_PROFILE action', () => {
	const setProfileAction = {type: SET_PROFILE, value: {id_str: '11'}};
	eq(reducers(undefined, setProfileAction).user, setProfileAction.value);
});

it('reducer after SET_TWEETS action', () => {
	const setTweetsAction = {type: SET_TWEETS, value: [{text: 'test'}]};
	eq(reducers(undefined, setTweetsAction).tweets, setTweetsAction.value);
});


// mock fetchApi
const session = {user_od: '11'};
const user = {name: 'test', screen_name: 'test'};
const tweets = [{text: 'test', created_at: '2017-11-30'}];
nock(`http://localhost:${process.env.PORT}`)
	.persist()
	.get('/session').reply(200, session)
	.get('/profile').reply(200, user)
	.get('/tweets').reply(200, tweets)
	.get('/logout').reply(204);

it('getTweets action', async () => {
	let state = {};
	await getTweets(action => {
		state = reducers(state, action);
	})();
	eq(state, {tweets, loading: false});
});

it('logout action', async () => {
	let state = {};
	await logout(action => {
		eq(action.value, undefined);
	})();
	eq(state, {});
});

it('getSession action', async () => {
	let state;
	await getSession(action => {
		state = reducers(state, action);
	})();
	eq(state, {session, user, tweets, loading: false});
});
