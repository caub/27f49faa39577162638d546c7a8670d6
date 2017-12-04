export const GET_SESSION = 'GET_SESSION';
export const SIGNIN = 'SIGNIN';
export const LOADING = 'LOADING';

export const LOGOUT = 'LOGOUT';

export const GET_TWEETS = '@GET_TWEETS';
export const SET_TWEETS = 'SET_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';
export const REMOVE_TWEET = 'REMOVE_TWEET';
export const SET_PROFILE = 'SET_PROFILE';
export const TWEET_MODAL = 'TWEET_MODAL';

export const SUBMIT_TWEET = '@SUBMIT_TWEET';
export const DELETE_TWEET = '@DELETE_TWEET';

// todo name actions with _REQ / _RES maybe to distinguish requests and responses
// above DELETE_TWEET is a deletion request, REMOVE_TWEET is done after response to filter it out

export const getSession = () => ({type: GET_SESSION});

export const getTweets = () => ({type: GET_TWEETS});

export const logout = () => ({type: LOGOUT});

export const toggleTweetModal = value => ({type: TWEET_MODAL, value});

export const submitTweet = tweet => ({type: SUBMIT_TWEET, value: tweet});

export const deleteTweet = id => ({type: DELETE_TWEET, value: id});
