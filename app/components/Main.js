import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

const MainStyle = styled.main`
	flex: 1;
	margin: 0 auto;
	max-width: 100%;
	width: 1000px;
	@media (max-width: 1200px) {
		width: 800px;
	}
	@media (max-width: 820px) {
		padding: 0 1em;
	}
	padding-top: 1em;

	.timeline {
		:empty::after {
			content: "No tweets yet!";
			opacity: .5;
		}
	}
`;

export const Tweet = styled.li`
	display: flex;
	align-items: center;
	span {
		flex: 1;
		font-size: 120%;
	}
	time {
		color: rgba(0,0,0,.5);
		font-size: 90%;
	}
`;

const tweetTemplate = tweet => (
	<Tweet key={tweet.id_str}>
		<span>{tweet.text}</span>
		<TimeAgo component="time" date={tweet.created_at} />
	</Tweet>
);

export const MainView = ({tweets}) => (
	<MainStyle>
		{tweets && (
			<>
				<h3>My tweets</h3>
				<ul className="timeline">
					{tweets.map(tweetTemplate)}
				</ul>
			</>
		)}
	</MainStyle>
);

const mapStateToProps = (state, _p) => state;

const mapDispatchToProps = (dispatch, _ownProps) => ({
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainView);

export default Main;
