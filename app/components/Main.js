import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import Refresh from './Refresh';
import {getTweets} from '../util/reducers';

const MainStyle = styled.main`
	margin-top: 6em;

	.timeline {
		margin: 0 auto;
		padding: 0 2em 0 5em;
		@media (min-width: 860px) {
			max-width: 800px;
		}

		:empty::after {
			content: "No tweets yet!";
			opacity: .5;
		}
	}
`;

export const Tweet = styled.li`
	display: flex;
	align-items: center;
	padding: 1.1em .6em;
	background: #fefefe;
	border: #e6ecf0 1px solid;
	border-top: none;
	:first-child {
		border-top: #e6ecf0 1px solid;
	}
	span {
		flex: 1;
		font-size: 125%;
	}
	time {
		color: rgba(0,0,0,.5);
		font-size: 90%;
	}
	:hover {
		background: #f6f8f9;
	}
`;

const tweetTemplate = tweet => (
	<Tweet key={tweet.id_str}>
		<span>{tweet.text}</span>
		<TimeAgo component="time" date={tweet.created_at} />
	</Tweet>
);

export const MainView = ({tweets, onRefresh}) => (
	<MainStyle>
		<Refresh onRefresh={onRefresh} />
		{tweets && (
			<ul className="timeline">
				{tweets.map(tweetTemplate)}
			</ul>
		)}
	</MainStyle>
);

const mapStateToProps = (state, _p) => state;

const mapDispatchToProps = (dispatch, _ownProps) => ({
	onRefresh: getTweets(dispatch),
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainView);

export default Main;
