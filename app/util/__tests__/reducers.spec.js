import eq from 'deep-eq';
import reducers from '../reducers';
import {
	SIGNIN,
	SET_PROFILE,
	SET_TWEETS,
} from '../actions';


it('reducer after SIGNIN action', () => {
	const signinAction = {type: SIGNIN, value: {user_id: '11'}};
	eq(reducers(undefined, signinAction).session, signinAction.value);
});

it('reducer after SIGNIN action to undefined (signout)', () => {
	const signoutAction = {type: SIGNIN, value: undefined};
	eq(reducers(undefined, signoutAction).session, signoutAction.value);
});

it('reducer after SET_PROFILE action', () => {
	const setProfileAction = {type: SET_PROFILE, value: {id_str: '11'}};
	eq(reducers(undefined, setProfileAction).user, setProfileAction.value);
});

it('reducer after SET_TWEETS action', () => {
	const setTweetsAction = {type: SET_TWEETS, value: [{text: 'test'}]};
	eq(reducers(undefined, setTweetsAction).tweets, setTweetsAction.value);
});

