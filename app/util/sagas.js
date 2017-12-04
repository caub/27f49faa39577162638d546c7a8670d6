import {call, all, fork, put, takeEvery} from 'redux-saga/effects';
import fetchApi from './fetchApi';
import {
	GET_SESSION,
	LOADING,
	SIGNIN,
	LOGOUT,
	SET_PROFILE,
	GET_TWEETS,
	SET_TWEETS,
	SUBMIT_TWEET,
	ADD_TWEET,
	DELETE_TWEET,
	REMOVE_TWEET,
} from './actions';

function* _getSession() {
	try {
		const session = yield call(fetchApi, '/session');
		yield put({type: SIGNIN, value: session});
		const [user, tweets] = yield all([
			call(fetchApi, '/profile'),
			call(fetchApi, '/tweets')
		]);
		yield all([
			put({type: SET_PROFILE, value: user}),
			put({type: SET_TWEETS, value: tweets})
		]);
	} catch (e) {
		// todo
		yield put({type: SIGNIN, value: {}});
	}
	if (typeof document !== 'undefined') {
		document.body.classList.remove('loading');
	}
}

function* _getSessionMock() {
	try {
		const session = yield call(fetchApi, '/session');
		yield put({type: SIGNIN, value: session});

		const user = {name: 'John Doe', screen_name: 'foobar', profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'};
		yield put({type: SET_PROFILE, value: user});
		yield put({type: SET_TWEETS, value: Array.from({length: 50}, (_,i)=>({id_str: ''+i, text: 'Heelo world '+i, created_at: new Date(2017, 11, 3), user}))});
	} catch (e) {
		// todo
		yield put({type: SIGNIN, value: {}});
	}
	if (typeof document !== 'undefined') {
		document.body.classList.remove('loading');
	}
}

export const getSession = process.env.MOCK ? _getSessionMock : _getSession;

export function* watchGetSession() {
	yield takeEvery(GET_SESSION, getSession);
}

// logout
export function* logout() {
	yield call(fetchApi, '/logout');
	yield put({type: SIGNIN, value: {}});
}

export function* watchLogout() {
	yield takeEvery(LOGOUT, logout);
}

// get tweets
export function* getTweets() {
	yield put({type: LOADING, value: true});
	const tweets = yield call(fetchApi, '/tweets');
	yield put({type: SET_TWEETS, value: tweets});
}

export function* watchGetTweets() {
	yield takeEvery(GET_TWEETS, getTweets);
}

// submit a new tweet
export function* submitTweet({value: tweetObj}) {
	const tweet = yield call(fetchApi, '/tweets', {method: 'POST', body: tweetObj});
	yield put({type: ADD_TWEET, value: tweet});
}

export function* watchSubmitTweet() {
	yield takeEvery(SUBMIT_TWEET, submitTweet);
}

// delete a tweet
export function* deleteTweet({value: id}) {
	yield call(fetchApi, '/tweets/' + id, {method: 'DELETE'});
	yield put({type: REMOVE_TWEET, value: id});
}
export function* watchDeleteTweet() {
	yield takeEvery(DELETE_TWEET, deleteTweet);
}

export default function* root() {
	yield all([
		fork(getSession), // execute it right at the beginning
		fork(watchGetSession),
		fork(watchGetTweets),
		fork(watchLogout),
		fork(watchSubmitTweet),
		fork(watchDeleteTweet)
	]);
}
