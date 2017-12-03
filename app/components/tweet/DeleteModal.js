import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Modal, {Content} from '../Modal';
import Tweet from './Tweet';
import {deleteTweet} from '../../util/reducers';

const ContentStyle = styled(Content)`
	input[type=submit] {
		background: #e0245e;
		color: #fafafa;
	}
	input[type] {
		margin: 1em 1em 0;
		border-radius: 15px;
		padding: 6px 14px;
		line-height: 20px;
	}
	> div {
		display: flex;
		justify-content: flex-end;
	}
`;

const DeleteModalView = ({tweet, active, onClose, onDelete}) => (
	<Modal active={active} onClose={onClose}>
		<ContentStyle tag="form" onSubmit={e => onDelete(e, tweet.id_str)}>
			<h3>Delete your tweet?</h3>
			<Tweet tweet={tweet} />
			<div>
				<input type="button" value="Cancel" onClick={onClose}/>
				<input type="submit" value="Delete"/>
			</div>
		</ContentStyle>
	</Modal>
);


const mapDispatchToProps = (dispatch, _ownProps) => ({
	onDelete: (e, id) => {
		e.preventDefault();
		deleteTweet(dispatch)(id);
	}
});

const DeleteModal = connect(undefined, mapDispatchToProps)(DeleteModalView);

export default DeleteModal;
