import {
	SIGNIN,
	LOADING,
	SET_TWEETS,
	ADD_TWEET,
	DELETE_TWEET,
	SET_PROFILE,
	TWEET_MODAL
} from './actions';

const reducersMap = {
	[SIGNIN]: (state, session) => ({...state, session}),
	[LOADING]: (state, loading = !state.loading) => ({...state, loading}),
	[SET_TWEETS]: (state, tweets) => ({...state, tweets, loading: false}),
	[ADD_TWEET]: (state, tweet) => ({
		...state,
		tweets: [tweet, ...(state.tweets || [])],
		loading: false,
		tweetModal: false
	}),
	[DELETE_TWEET]: (state, id) => ({
		...state,
		tweets: (state.tweets || []).filter(t => t.id_str !== id),
		loading: false
	}),
	[SET_PROFILE]: (state, user) => ({...state, user}),
	[TWEET_MODAL]: (state, tweetModal = !state.tweetModal) => ({...state, tweetModal}),
};

export default (state = {}, {type, value} = {}) => {
	const fn = reducersMap[type];
	if (fn) {
		return fn(state, value);
	}
	if (!/^@/.test(type)) {
		console.warn(type, 'not impl');
	}
	return state;
};
