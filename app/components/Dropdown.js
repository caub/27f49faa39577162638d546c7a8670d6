import React from 'react';
import styled from 'styled-components';

/**
 * Dropdown component must contain an element with className .dropdown-content, Content does this automatically
 */
/*
usage:
<Dropdown>
	<Button>click</Button>
	<Content>body</Content>
</Dropdown>
or
<Dropdown>{
	({toggle}) => (
		<>
			<Button>click</Button>
			<Content>body</Content>
		</>
	)}
</Dropdown>
 */

export const Content = ({tag: Tag = 'div', ...props}) => (
	<Tag {...props} className={'dropdown-content ' + (props.className || '')} />
);

// todo adjust position below, depending on props.rtl, props.btt and available space in viewport
const arrowSize = 8;
const Div = styled.div`
	position: relative;

	.dropdown-content {
		position: absolute;
		z-index: 2;
		margin-top: 8px;
		box-shadow: 0 0 10px rgba(0,0,0,.075);
		border: 1px solid #eaeaea;
		border-radius: ${arrowSize}px;
		background-color: #fff;
		top: 110%;
		bottom: auto;
		right: 5px;
		left: auto;
		${props => props.active ? '' : 'display: none;'}

		&::after, &::before {
			content: " ";
			bottom: 100%;
			right: ${arrowSize * 2}px;
			border: solid transparent;
			height: 0;
			width: 0;
			position: absolute;
			pointer-events: none;
		}

		&::after {
			border-color: rgba(0, 0, 0, 0);
			border-bottom-color: white;
			border-width: ${arrowSize}px;
			margin-left: -${arrowSize}px;
		}
		&::before {
			border-color: rgba(0, 0, 0, 0);
			border-bottom-color: #eaeaea;
			border-width: ${arrowSize + 1}px;
			margin-left: -${arrowSize + 1}px;
		}
	}
`;

export default class Dropdown extends React.PureComponent {
	state = {
		active: false
	}

	onToggle = e => {
		const dropdown = this.dropdown;

		if (e === undefined) { // toggle
			this.toggleListeners(!this.state.active);
			this.setState({ active: !this.state.active });
			return;
		}

		// click out or forceClose -> close
		if (
			(e.type === 'keydown' && (e.key === 'Escape' || e.key === 'Tab'))
				|| 
			e.type !== 'keydown' && dropdown && !dropdown.contains(e.target) || e === false
		) {
			this.toggleListeners(false);
			this.setState({ active: false });
			return;
		}

		// toggle if click in dropdown buttons (anything but content)
		const content = dropdown.querySelector('.dropdown-content');
		if (e.type !== 'keydown' && (!content || !content.contains(e.target))) { // toggle
			this.toggleListeners(!this.state.active);
			this.setState({ active: !this.state.active });
		}
	}

	toggleListeners = force => { // todo add a resize handler
		if (force) {
			document.addEventListener('mousedown', this.onToggle);
			document.addEventListener('keydown', this.onToggle);
		} else {
			document.removeEventListener('mousedown', this.onToggle);
			document.removeEventListener('keydown', this.onToggle);
		}
	}

	componentWillUnmount() {
		this.toggleListeners(false);
	}

	render() {
		const {active} = this.state;

		return (
			<Div
				innerRef={el => this.dropdown = el}
				className={'dropdown ' + this.props.className}
				onMouseDown={this.onToggle}
				onTouchDown={this.onToggle}
				active={active}
			>
				{
					typeof this.props.children === 'function' ? this.props.children({
						active,
						toggle: this.onToggle
					}) : this.props.children
				}
			</Div>
		);
	}
}


Dropdown.defaultProps = {
	className: ''
	// rtl: false,
	// btt: false
};
