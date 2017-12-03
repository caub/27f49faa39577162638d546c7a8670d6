import React from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';

const TweetModalStyle = styled.div`
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;
	opacity: ${p => p.active ? 1 : 0};
	pointer-events: ${p => p.active ? 'auto' : 'none'};
	background: rgba(0,0,0,.6);
	display: flex;
	align-items: center;
	justify-content: center;

	.modal-content {
		padding: 1em;
		background: #fafafa;
		border-radius: 10px;
	}
	textarea {
		width: 460px;
		height: 80px;
		font-size: 1.1em;
		line-height: 1.8em;
		padding: 10px 16px;
		border-radius: 6px;
		border: solid 1px #ddd;
		outline: none;
	}
`;

export default ({active, onClose}) => createPortal((
	<TweetModalStyle active={active} onClick={e => e.target === e.currentTarget && onClose(e)}>
		<form className="modal-content">
			<h3>Write your tweet</h3>
			<textarea>
				Todo...
			</textarea>
			<input type="submit" value="Tweet" />
		</form>
	</TweetModalStyle>
), document.body);
