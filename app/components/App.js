import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import Dropdown, {Content} from './Dropdown';
import Refresh from './Refresh';
import {ORIGIN} from '../util/fetchApi';
import {logout, getTweets} from '../util/reducers';

const Screen = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;

	header {
		background: rgba(0,0,200,.2);
		height: 70px;
		display: flex;
		align-items: center;
		h1 {
			text-align: center;
			flex: 1;
		}
		.logout {
			background: #777;
		}
	}

	main {
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
	}
	.timeline {
		:empty::after {
			content: "No tweets yet!";
			opacity: .5;
		}
	}
`;

export const Signin = styled.div`
	text-align: center;
	align-self: center;
	h1 {
		margin-bottom: 3em;
		font-size: 240%;
	}
	a.twitter {
		background: rgba(200,200,200,.2);
		display: flex;
		align-items: center;
		font-size: 1.5em;
		color: #444;
		border: 1px solid #e2e2e2;
		border-radius: 6px;
		font-weight: 600;
		padding: 6px 12px;

		:hover {
			filter: brightness(1.03);
			border-color: #d2d2d2;
		}

		svg {
			width: 50px;
			height: 42px;
			margin-right: 8px;
		}
	}
`;



const Profile = styled.div`
	display: flex;
	align-items: center;
	img {
		object-fit: contain;
		width: 48px;
		height: 48px;
		margin: 4px;
	}
	div {
		display: flex;
		flex-direction: column;
		margin-bottom: -2px;
	}
	span {
		padding: 2px;
	}
	.name {
		font-weight: 600;
	}
	.username {
		color: rgba(0,0,0,.7);
		font-size: 90%;
	}
`;

export const AppView = ({session, user = {}, tweets, onLogout, onRefresh}) => (
	<Screen>
		{session ? (
			<>
				<header>
					<Refresh onRefresh={onRefresh} />
					<h1>Twitt</h1>
					<Profile>
						<div>
							<span className="name">{user.name}</span>
							<span className="username">{user.screen_name && ('@' + user.screen_name)}</span>
						</div>
						<Dropdown>
							<button>
								<img src={user.profile_image_url_https} />
							</button>
							<Content>
								<button className="btn logout" onClick={onLogout}>Logout</button>
							</Content>
						</Dropdown>
					</Profile>
				</header>
				<main>
					{tweets && (
						<>
							<h3>My tweets</h3>
							<ul className="timeline">
								{tweets.map(tweetTemplate)}
							</ul>
						</>
					)}
				</main>
			</>
		) : (
			<Signin>
				<h1>Twitt</h1>
				<a className="twitter" href={ORIGIN + '/signin/twitter?r=' + location.origin}>
					<svg>
						<use href="#logo" />
					</svg>
					<span>Sign in with Twitter</span>
				</a>
			</Signin>
		)}
	</Screen>
);

const Tweet = styled.li`
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

const mapStateToProps = (state, _p) => state;

const mapDispatchToProps = (dispatch, _ownProps) => ({
	onLogout: logout(dispatch),
	onRefresh: getTweets(dispatch),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppView);

export default App;
