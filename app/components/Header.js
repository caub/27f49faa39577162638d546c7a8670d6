import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Dropdown, {Content} from './Dropdown';
import TweetModal from './TweetModal';
import {logout, toggleTweetModal, submitTweet} from '../util/reducers';

const HeaderStyle = styled.header`
	position: fixed;
	left: 0; right: 0; top: 0;
	background: rgba(100,170,255,.65);
	height: 70px;
	display: flex;
	align-items: center;
	h1 {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(0,30,120,.8);
	}
	svg {
		width: 40px;
		height: 32px;
		margin-right: 6px;
		path {
			fill: red;
		}
	}
	.logout {
		background: #c55;
	}
	.btn.tweet {
		position: absolute;
		left: 10px;
		margin: 0;
		font-size: 1.4em;
		border-radius: 20px;
		background: rgba(0,110,220,.7);
	}
`;

const Profile = styled.div`
	position: absolute;
	right: 6px;
	display: flex;
	align-items: center;

	img {
		object-fit: contain;
		width: 48px;
		height: 48px;
		margin: 4px;
	}
	.user-infos {
		display: flex;
		flex-direction: column;
		margin-bottom: -2px;
		padding: 6px 10px;

		> div {
			padding: 2px;
			white-space: nowrap;
		}
	}

	.name {
		font-weight: 600;
		white-space: nowrap;
	}
	.username {
		color: rgba(0,0,0,.7);
		font-size: 90%;
		white-space: nowrap;
	}
`;

// todo resize handler if we care to re-render for matchMedia
const userInfos = user => (
	<div className="user-infos">
		<div className="name">{user.name}</div>
		<div className="username">{user.screen_name && ('@' + user.screen_name)}</div>
	</div>
);

export const HeaderView = ({user = {}, tweetModal, onLogout, onToggleTweet, onSubmitTweet}) => (
	<HeaderStyle>
		<button className="btn tweet" onClick={onToggleTweet}>Tweet</button>
		<h1>
			<svg>
				<use href="#logo" />
			</svg>
			<span>Twitt</span>
		</h1>
		<Profile>
			{matchMedia('(min-width: 621px)').matches && userInfos(user)}
			<Dropdown>
				<button>
					<img src={user.profile_image_url_https} />
				</button>
				<Content>
					{matchMedia('(max-width: 620px)').matches && userInfos(user)}
					<button className="btn logout" onClick={onLogout}>Logout</button>
				</Content>
			</Dropdown>
		</Profile>
		<TweetModal active={tweetModal} onClose={onToggleTweet} onSubmit={onSubmitTweet}/>
	</HeaderStyle>
);

const mapStateToProps = (state, _p) => state;

const mapDispatchToProps = (dispatch, _ownProps) => ({
	onLogout: logout(dispatch),
	onToggleTweet: () => toggleTweetModal(dispatch)(),
	onSubmitTweet: e => {
		e.preventDefault();
		submitTweet(dispatch)(e.currentTarget.status.value); // currentTarget / target is the form
	}
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView);

export default Header;
