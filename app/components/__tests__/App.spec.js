import React from 'react';
import {shallow, mount} from 'enzyme';
import eq from 'deep-eq';

process.env.PORT = process.env.PORT || 3002;

import {AppView, Signin} from '../App';

it('should render signin frame with no session', () => {
	const wrapper = shallow(<AppView />);
	eq(wrapper.find(Signin).length, 1);
});

it('should render authenticated frame', () => {
	const onRefresh = jest.fn();
	const onLogout = jest.fn();

	const wrapper = shallow(<AppView session={{user_id: '11'}} onLogout={onLogout} onRefresh={onRefresh} />);
	eq(wrapper.find(Signin).length, 0);
	
	wrapper.find('.btn.refresh').simulate('click');
	eq(onRefresh.mock.calls.length, 1);

	wrapper.find('.btn.logout').simulate('click');
	eq(onLogout.mock.calls.length, 1);
});
