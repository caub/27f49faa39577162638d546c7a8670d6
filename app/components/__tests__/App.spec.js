import React from 'react';
import {shallow} from 'enzyme';
import eq from 'deep-eq';
import {AppView} from '../App';
import Signin from '../Signin';
import Main from '../Main';

it('should render Signin with no session', () => {
	const wrapper = shallow(<AppView />);
	eq(wrapper.find(Signin).length, 1);
});

it('should render Main with session', () => {
	const wrapper = shallow(<AppView session={{user_id: '11'}} />);
	eq(wrapper.find(Main).length, 1);
});
