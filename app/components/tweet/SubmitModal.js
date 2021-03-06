import React from 'react';
import styled from 'styled-components';
import Modal, {Content} from '../Modal';

const ContentStyle = styled(Content)`
	display: flex;
	flex-direction: column;
	textarea {
		width: 460px;
		max-width: 98vw;
		height: 80px;
		font-size: 1.1em;
		line-height: 1.8em;
		padding: 10px 16px;
		border-radius: 6px;
		border: solid 1px #ddd;
		outline: none;
	}
	.chars {
		position: absolute;
		right: 32px;
		bottom: 68px;
		color: #e0245e;
	}
	input[type=submit] {
		justify-self: flex-end;
		align-self: flex-end;
		margin: 1em 6px 0;
		border-radius: 15px;
		padding: 6px 14px;
		line-height: 20px;
	}
`;

export default class SubmitModal extends React.PureComponent {
	state = {text: ''}
	render() {
		const {active, onClose, onSubmit} = this.props;
		return (
			<Modal active={active} onClose={onClose}>
				<ContentStyle tag="form" onSubmit={onSubmit}>
					<h3>Write your tweet</h3>
					<textarea name="status" value={this.state.text} onChange={e => this.setState({text: e.target.value})} placeholder="Check out ...🚀" />
					{this.state.text.length > 240 && <span className="chars">{240 - this.state.text.length}</span>}
					<input type="submit" value="Tweet" />
				</ContentStyle>
			</Modal>
		);
	}
}
