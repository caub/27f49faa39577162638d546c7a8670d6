import fetchApi from './fetchApi';

export const SIGNIN = 'SIGNIN';
export const LOADING = 'LOADING';
export const SET_TWEETS = 'SET_TWEETS';
export const SET_PROFILE = 'SET_PROFILE';

const delay = (t, v) => new Promise(r => setTimeout(r, t, v));

const actions = {
	[SIGNIN]: (state, session) => ({...state, session}),
	[LOADING]: (state, loading = !state.loading) => ({...state, loading}),
	[SET_TWEETS]: (state, tweets) => ({...state, tweets, loading: false}),
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
		return fetchApi('/profile')
			.then(user => dispatch({type: SET_PROFILE, value: user}));
		// dispatch({type: SET_PROFILE, value: {name: 'Cyril auburtio', screen_name: 'lol', profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'}});
		// dispatch({type: SET_TWEETS, value: Array.from({length: 50}, (_,i)=>({id_str: ''+i, text: 'Heelo world '+i, created_at: new Date(2017, 11, 3)}))})
	})
	.catch(() => {});

export const logout = dispatch => () => fetchApi('/logout')
	.then(() => dispatch({type: SIGNIN, value: undefined}));

export const getTweets = dispatch => async () => {
	dispatch({type: LOADING, value: true});
	await delay(1000);
	return fetchApi('/tweets')
		.then(tweets => dispatch({type: SET_TWEETS, value: tweets}));
};

