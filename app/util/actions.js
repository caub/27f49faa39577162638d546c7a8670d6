import fetchApi from './fetchApi';

export const GET_SESSION = 'GET_SESSION';
export const SIGNIN = 'SIGNIN';
export const LOADING = 'LOADING';
export const SET_TWEETS = 'SET_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const SET_PROFILE = 'SET_PROFILE';
export const TWEET_MODAL = 'TWEET_MODAL';


export const getSession = () => ({type: GET_SESSION});


export const logout = dispatch => () => fetchApi('/logout')
	.then(() => dispatch({type: SIGNIN, value: undefined}));

export const getTweets = dispatch => async () => {
	dispatch({type: LOADING, value: true});
	return fetchApi('/tweets')
		.then(tweets => dispatch({type: SET_TWEETS, value: tweets}));
};

export const toggleTweetModal = dispatch => value => dispatch({type: TWEET_MODAL, value});

export const submitTweet = dispatch => status => fetchApi('/tweets', {method: 'POST', body: {status}})
	.then(tweet => {
		dispatch({type: ADD_TWEET, value: tweet});
	});

export const deleteTweet = dispatch => id => fetchApi('/tweets/' + id, {method: 'DELETE'})
	.then(res => {
		dispatch({type: DELETE_TWEET, value: id});
	});
