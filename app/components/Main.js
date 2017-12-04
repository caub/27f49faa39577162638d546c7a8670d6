import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Refresh from './Refresh';
import {getTweets} from '../util/actions';
import Tweet from './tweet/Tweet';
import OptionsDropdown from './tweet/OptionsDropdown';

const MainStyle = styled.main`
	margin-top: 5em;

	.timeline {
		margin: 0 auto;
		@media (min-width: 860px) {
			max-width: 800px;
		}

		:empty::after {
			content: "No tweets yet!";
			opacity: .5;
		}
	}
`;

export const MainView = ({tweets, loading, getTweets}) => (
	<MainStyle>
		<Refresh loading={loading} onRefresh={getTweets} />
		{tweets && (
			<ul className="timeline">
				{tweets.map(tweet => (
					<Tweet tweet={tweet} key={tweet.id_str}>
						<OptionsDropdown tweet={tweet} />
					</Tweet>
				))}
			</ul>
		)}
	</MainStyle>
);

const mapStateToProps = (state, _p) => state;

const Main = connect(mapStateToProps, {getTweets})(MainView);

export default Main;
