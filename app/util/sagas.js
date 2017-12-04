import {call, all, fork, put, takeEvery} from 'redux-saga/effects';
import fetchApi from './fetchApi';
import {GET_SESSION, SIGNIN, SET_PROFILE, SET_TWEETS} from './actions';

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
		if (typeof document !== 'undefined') {
			document.body.classList.remove('loading');
		}
	} catch (e) {
		// todo
	}
}

function* _getSessionMock() {
	try {
		const session = yield call(fetchApi, '/session');
		yield put({type: SIGNIN, value: session});

		const user = {name: 'John Doe', screen_name: 'foobar', profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'};
		yield put({type: SET_PROFILE, value: user});
		yield put({type: SET_TWEETS, value: Array.from({length: 50}, (_,i)=>({id_str: ''+i, text: 'Heelo world '+i, created_at: new Date(2017, 11, 3), user}))});
		if (typeof document !== 'undefined') {
			document.body.classList.remove('loading');
		}
	} catch (e) {
		// todo
	}
}

export const getSession = process.env.MOCK ? _getSessionMock : _getSession;

export function* watchGetSession() {
	yield takeEvery(GET_SESSION, getSession);
}


export default function* root() {
	yield all([
		fork(getSession),
		fork(watchGetSession)
	]);
}
