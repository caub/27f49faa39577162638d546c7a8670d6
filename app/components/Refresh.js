import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	margin: 8px;
	border: 2px solid #40c0e7;
	padding: 4px;
	border-radius: 50%;
	animation: ${props => props.loading ? 'rotate 1.5s linear infinite' : null};
	::after {
		content: "🔄";
		font-size: 2em;
	}
	@keyframes rotate {
		100% {
			transform: rotate(-360deg);
		}
	}
`;

export default class Refresh extends React.PureComponent {
	state = {}

	render() {
		return (
			<Button loading={this.state.loading} onClick={() => {
				this.setState({loading: true});
				this.props.onRefresh().then(() => this.setState({loading: false}));
			}} title="Refresh tweets" />
		);
	}
}