import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Dropdown, {Content} from './Dropdown';
import Refresh from './Refresh';
import {logout, getTweets} from '../util/reducers';

const HeaderStyle = styled.header`
	background: rgba(0,0,200,.2);
	height: 70px;
	display: flex;
	align-items: center;
	h1 {
		text-align: center;
		flex: 1;
	}
	.logout {
		background: #c55;
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

export const HeaderView = ({user = {}, onRefresh, onLogout}) => (
	<HeaderStyle>
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
	</HeaderStyle>
);

const mapStateToProps = (state, _p) => state;

const mapDispatchToProps = (dispatch, _ownProps) => ({
	onLogout: logout(dispatch),
	onRefresh: getTweets(dispatch),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView);

export default Header;
