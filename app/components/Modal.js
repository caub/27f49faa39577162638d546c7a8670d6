import React from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';

const ModalStyle = styled.div`
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
		position: relative;
	}
`;

export const Content = ({tag: Tag = 'div', ...props}) => (
	<Tag {...props} className={'modal-content ' + (props.className || '')} />
);

export default ({active, children, onClose}) => createPortal((
	<ModalStyle active={active} onClick={e => e.target === e.currentTarget && onClose(e)}>
		{children}
	</ModalStyle>
), document.body);
