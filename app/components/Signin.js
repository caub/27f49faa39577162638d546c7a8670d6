import React from 'react';
import styled from 'styled-components';
import {ORIGIN} from '../util/fetchApi';

export const SigninStyle = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	height: 100vh;
	align-items: center;
	justify-content: center;
	h1 {
		margin-bottom: 1.2em;
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

export default function Signin() {
	return (
		<SigninStyle>
			<h1>Twitt</h1>
			<a className="twitter" href={ORIGIN + '/signin/twitter?r=' + location.origin}>
				<svg>
					<use href="#logo" />
				</svg>
				<span>Sign in with Twitter</span>
			</a>
		</SigninStyle>
	);
}
