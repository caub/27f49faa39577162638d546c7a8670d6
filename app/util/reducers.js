import fetchApi from './fetchApi';

export const SIGNIN = 'SIGNIN';
export const SET_TWEETS = 'SET_TWEETS';
export const SET_PROFILE = 'SET_PROFILE';

const actions = {
	[SIGNIN]: (state, session) => ({...state, session}),
	[SET_TWEETS]: (state, tweets) => ({...state, tweets}),
	[SET_PROFILE]: (state, user) => ({...state, user}),
};

export default (state = {}, {type, value} = {}) => {
	const fn = actions[type];
	if (fn) {
		return fn(state, value);
	}
	if (!/^@/.test(type)) {
		console.warn(type, 'not impl');
	}
	return state;
};

export const getSession = dispatch => () => fetchApi('/session')
	.then(session => {
		dispatch({type: SIGNIN, value: session});
		fetchApi('/profile')
			.then(user => dispatch({type: SET_PROFILE, value: user}));
	})
	.catch(() => {});

export const logout = dispatch => () => fetchApi('/logout')
	.then(() => dispatch({type: SIGNIN, value: undefined}));

export const getTweets = dispatch => () => fetchApi('/tweets')
	.then(tweets => dispatch({type: SET_TWEETS, value: tweets}));

