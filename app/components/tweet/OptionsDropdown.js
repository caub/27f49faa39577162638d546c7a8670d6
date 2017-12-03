import React from 'react';
import styled from 'styled-components';
import Dropdown, {Content} from '../Dropdown';
import DeleteModal from './DeleteModal';

const Button = styled.button`
	::before {
		content: "⌄";
		font-size: 1.8em;
	}
`;

const DropdownStyle = styled(Dropdown)`
	position: absolute;
	right: 8px;
	top: 4px;

	li {
		padding: 6px 12px;
	}
`;

export default class OptionsDropdown extends React.PureComponent {
	state = {deleteModal: false}

	render() {
		const {tweet} = this.props;
		return (
			<DropdownStyle>
				{({toggle}) => (
					<>
						<Button />
						<Content tag="ul">
							<li>
								<button className="" onClick={() => {
									this.setState({deleteModal: true});
									toggle();
								}}>Delete tweet</button>
							</li>
						</Content>
						<DeleteModal
							tweet={tweet}
							active={this.state.deleteModal}
							onClose={e => this.setState({deleteModal: false})}
						/>
					</>
				)}
			</DropdownStyle>
		);
	}
}