import React from 'react';
import {shallow} from 'enzyme';
import eq from 'deep-eq';
import {MainView} from '../Main';
import Tweet from '../tweet/Tweet';


it('should render Main with tweets', () => {
	const wrapper = shallow(<MainView tweets={[{id_str: '1', text: 'test'}]} />);
	eq(wrapper.find(Tweet).length, 1);
});
