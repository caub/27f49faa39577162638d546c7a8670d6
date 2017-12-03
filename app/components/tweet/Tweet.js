import React from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

const TweetStyle = styled.li`
	display: flex;
	position: relative;
	align-items: center;
	padding: 1.1em .6em;
	background: #fefefe;
	border: #e6ecf0 1px solid;
	border-top: none;
	:first-child {
		border-top: #e6ecf0 1px solid;
	}
	> div {
		flex: 1;
		* {
			white-space: nowrap;
		}
		> div:first-child {
			margin-bottom: 6px;
		}
		> div:last-child {
			font-size: 120%;
		}
		strong {
			margin-right: 4px;
		}
		span {
			color: rgba(0,0,0,.5);
		}
	}
	time {
		color: rgba(0,0,0,.5);
		font-size: 90%;
		::before {
			content: "·";
			margin: 0 4px;
		}
	}
	:hover {
		background: #f6f8f9;
	}
	img {
		border-radius: 50%;
		margin-right: 10px;
		object-fit: contain;
		width: 48px;
		height: 48px;
	}
`;

const Tweet = ({tweet, children}) => (
	<TweetStyle>
		<img src={tweet.user.profile_image_url_https} alt="" />
		<div>
			<div>
				<strong>{tweet.user.name}</strong>
				<span>{tweet.user.screen_name && ('@' + tweet.user.screen_name)}</span>
				<TimeAgo component="time" date={tweet.created_at} />
			</div>
			<div>{tweet.text}</div>
		</div>
		{children}
	</TweetStyle>
);

export default Tweet;
