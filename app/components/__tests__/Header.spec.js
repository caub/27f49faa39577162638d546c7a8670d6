import React from 'react';
import {shallow} from 'enzyme';
import eq from 'deep-eq';
import {HeaderView} from '../Header';

it('should render Header with user data and logout button', () => {
	const onLogout = jest.fn();

	const wrapper = shallow(<HeaderView user={{name: 'test'}} onLogout={onLogout} />);
	eq(wrapper.find('.name').text(), 'test');

	wrapper.find('.btn.logout').simulate('click');
	eq(onLogout.mock.calls.length, 1);
});
