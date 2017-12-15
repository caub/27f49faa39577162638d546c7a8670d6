import {delay} from 'redux-saga';
import {call, all, put} from 'redux-saga/effects';
import eq from 'deep-eq';
import fetchApi from '../fetchApi';
import {getSession} from '../sagas';
import {SIGNIN, SET_PROFILE, SET_TWEETS} from '../actions';

const session = {user_id: '11'};
const user = {name: 'test', screen_name: 'test'};
const tweets = [{text: 'test', created_at: '2017-11-30'}];

it('session saga should pass', () => {
	const saga = getSession();
	eq(saga.next().value, all([
		call(fetchApi, '/session'),
		call(delay, 1000)
	]));
	
	eq(saga.next([session]).value, put({type: SIGNIN, value: session}));

	eq(saga.next().value, all([
		call(fetchApi, '/profile'),
		call(fetchApi, '/tweets')
	]));
	eq(saga.next([user, tweets]).value, all([
		put({type: SET_PROFILE, value: user}),
		put({type: SET_TWEETS, value: tweets})
	]));
});

