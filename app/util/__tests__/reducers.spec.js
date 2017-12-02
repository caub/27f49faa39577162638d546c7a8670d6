process.env.PORT = process.env.PORT || 3002;

import eq from 'deep-eq';
import nock from 'nock';

import reducers, {
	SIGNIN,
	SET_PROFILE,
	SET_TWEETS,
	getSession,
	logout,
	getTweets
} from '../reducers';


it('reducers should pass', () => {
	const signinAction = {type: SIGNIN, value: {user_id: '11'}};
	eq(reducers(undefined, signinAction).session, signinAction.value);

	const signoutAction = {type: SIGNIN, value: undefined};
	eq(reducers(undefined, signoutAction).session, signoutAction.value);

	const setProfileAction = {type: SET_PROFILE, value: {id_str: '11'}};
	eq(reducers(undefined, setProfileAction).user, setProfileAction.value);

	const setTweetsAction = {type: SET_TWEETS, value: [{text: 'test'}]};
	eq(reducers(undefined, setTweetsAction).tweets, setTweetsAction.value);
});


it('action functions should pass', async () => {

	const session = {user_od: '11'};
	const user = {name: 'test', screen_name: 'test'};
	const tweets = [{text: 'test', created_at: '2017-11-30'}];
	nock(`http://localhost:${process.env.PORT}`)
		.get('/session').reply(200, session)
		.get('/profile').reply(200, user)
		.get('/tweets').reply(200, tweets)
		.get('/logout').reply(204);

	await getTweets(action => {
		eq(action.value, tweets);
	})();

	await logout(action => {
		eq(action.value, undefined);
	})();

	let state;
	await getSession(action => {
		state = reducers(state, action);
	})();
	eq(state, {session, user});

});

