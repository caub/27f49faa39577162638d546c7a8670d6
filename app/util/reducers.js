import fetchApi from './fetchApi';

export const SIGNIN = 'SIGNIN';
export const LOADING = 'LOADING';
export const SET_TWEETS = 'SET_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';
export const SET_PROFILE = 'SET_PROFILE';
export const TWEET_MODAL = 'TWEET_MODAL';

const delay = (t, v) => new Promise(r => setTimeout(r, t, v));

const actions = {
	[SIGNIN]: (state, session) => ({...state, session}),
	[LOADING]: (state, loading = !state.loading) => ({...state, loading}),
	[SET_TWEETS]: (state, tweets) => ({...state, tweets, loading: false}),
	[ADD_TWEET]: (state, tweet) => ({...state, tweets: (state.tweets || []).concat(tweet), loading: false}),
	[SET_PROFILE]: (state, user) => ({...state, user}),
	[TWEET_MODAL]: (state, tweetModal = !state.tweetModal) => ({...state, tweetModal}),
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


export const getSession = (dispatch, shouldMock) => !shouldMock ? () => fetchApi('/session')
	.then(session => {
		dispatch({type: SIGNIN, value: session});
		return Promise.all([
			fetchApi('/profile')
				.then(user => dispatch({type: SET_PROFILE, value: user})),
			fetchApi('/tweets')
				.then(tweets => dispatch({type: SET_TWEETS, value: tweets}))
		]);
	})
	.catch(() => {}) : () => fetchApi('/session') // for testing
	.then(session => {
		dispatch({type: SIGNIN, value: session});
		dispatch({type: SET_PROFILE, value: {name: 'John Doe', screen_name: 'foobar', profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'}});
		const user = {name: 'John Doe', screen_name: 'foobar', profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'};
		dispatch({type: SET_TWEETS, value: Array.from({length: 50}, (_,i)=>({id_str: ''+i, text: 'Heelo world '+i, created_at: new Date(2017, 11, 3), user}))})
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

export const toggleTweetModal = dispatch => value => dispatch({type: TWEET_MODAL, value});

export const submitTweet = dispatch => status => fetchApi('/tweets', {method: 'POST', body: {status}})
	.then(tweet => {
		console.log(tweet);
		dispatch({type: ADD_TWEET, value: tweet});
	});
